import threading
import time
from datetime import datetime, timedelta
from django.core.exceptions import PermissionDenied
from django.utils.deprecation import MiddlewareMixin

class RateLimitMiddleware(MiddlewareMixin):
    def __init__(self, get_response=None):
        self.get_response = get_response
        self.requests = {}
        self.flush_interval = 3600  # Flush every hour
        self.start_flush_thread()

    def start_flush_thread(self):
        def flush():
            while True:
                time.sleep(self.flush_interval)
                self.requests = {}  # Flush the dictionary
        thread = threading.Thread(target=flush, daemon=True)
        thread.start()

    def process_request(self, request):
        ip = request.META.get('REMOTE_ADDR')
        if ip not in self.requests:
            self.requests[ip] = []

        now = datetime.now()
        self.requests[ip] = [timestamp for timestamp in self.requests[ip] if now - timestamp < timedelta(minutes=1)]

        if len(self.requests[ip]) >= 5:
            raise PermissionDenied("Too many requests")

        self.requests[ip].append(now)

        response = self.get_response(request)
        return response
