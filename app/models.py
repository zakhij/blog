from django.db import models
from django.utils.text import slugify
from django.db.models.signals import post_save
from django.dispatch import receiver
from app.emails import send_new_blog_email
import hashlib


# Data model for blog posts
class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    content = models.TextField(blank=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    image_url = models.URLField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Automatically generate slug when a new blog post is created
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


# Data model for comments
class Comment(models.Model):
    blog_post = models.ForeignKey(
        BlogPost, related_name="comments", on_delete=models.CASCADE
    )
    author = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author} on {self.blog_post}"


# Data model for subscriber email list
class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    token = models.CharField(max_length=64, blank=True, unique=True)

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = hashlib.sha256(self.email.encode()).hexdigest()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email


# Signal to send notification email to subscribers when a new blog post is created
@receiver(post_save, sender=BlogPost)
def send_notification_email_to_subscribers(sender, instance, created, **kwargs):
    if created:
        subscribers = Subscriber.objects.all()
        send_new_blog_email(instance, subscribers)
