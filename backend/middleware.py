import threading
import time
from datetime import datetime, timedelta
from django.core.exceptions import PermissionDenied
from django.utils.deprecation import MiddlewareMixin

# Custom middleware to rate limit requests
"""

"""
class RateLimitMiddleware(MiddlewareMixin):
    """
    Custom middleware to rate limit POST requests, specifically for commenters. 
    Requests are limited to 5 per minute to avoid spamming.
    """
    def __init__(self, get_response=None):
        self.get_response = get_response
        self.requests = {}
        self.flush_interval = 3600 
        self.start_flush_thread()

    #Thread to flush the dictionary of requests every hour, avoiding memory leaks
    def start_flush_thread(self):
        def flush():
            while True:
                time.sleep(self.flush_interval)
                self.requests = {}
        thread = threading.Thread(target=flush, daemon=True)
        thread.start()

    #Checks if the IP address has made too many requests in the last minute
    def process_request(self, request):
        if request.method != 'POST':
            return self.get_response(request)
         
        ip = request.META.get('REMOTE_ADDR')
        if ip not in self.requests:
            self.requests[ip] = []

        now = datetime.now()
        self.requests[ip] = [timestamp for timestamp in self.requests[ip] if now - timestamp < timedelta(minutes=1)]

        if len(self.requests[ip]) >= 5:
            raise PermissionDenied("Too many requests")

        self.requests[ip].append(now)

        return self.get_response(request)
