from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def send_new_blog_email(blog, subscribers):
    subject = f"New Blog Post: {blog.title}"
    html_message = render_to_string('new_blog.html', {'blog': blog})
    plain_message = strip_tags(html_message)
    for subscriber in subscribers:
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=None,
            recipient_list=[subscriber.email],
            html_message=html_message
        )