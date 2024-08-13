from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def send_new_blog_email(blog, subscribers):
    subject = f"New Blog Post: {blog.title}"
    #html_message = render_to_string('new_blog.html', {'blog': blog})
    html_message = "<p>New Blog Post: <a href='https://signalinthehaystack.xyz/blogposts/{blog.slug}'>{blog.title}</a></p>"
    #plain_message = strip_tags(html_message)
    plain_message = f"New Blog Post: {blog.title}"
    to_list = [subscriber.email for subscriber in subscribers]

    send_mail(subject=subject, from_email=None, message=plain_message,recipient_list=to_list, html_message=html_message)