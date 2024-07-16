from django.db import models
from django.utils.text import slugify

# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    content = models.TextField(blank=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    image_url = models.URLField(max_length=200, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
