from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings


def send_new_blog_email(blog, subscribers):
    subject = f"New Blog Post: {blog.title}"

    for subscriber in subscribers:
        context = {
            "blog": blog,
            "subscriber": subscriber,
            "email_website": settings.EMAIL_WEBSITE,
        }
        html_message = render_to_string("new_blog.html", context)
        plain_message = strip_tags(html_message)
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=None,
            recipient_list=[subscriber.email],
            html_message=html_message,
        )
