from django.contrib import admin
from .models import BlogPost, Comment, Subscriber

# Register your models here.
admin.site.register(BlogPost)
admin.site.register(Comment)
admin.site.register(Subscriber)