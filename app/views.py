from rest_framework import viewsets, generics, status, response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404

from .models import BlogPost, Comment, Subscriber
from .serializers import BlogPostSerializer, CommentSerializer, SubscriberSerializer


# View for blog posts
class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by("-created_at")
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "slug"


# View for comments
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        return self.queryset.filter(blog_post__slug=self.kwargs["blog_post_slug"])

    def perform_create(self, serializer):
        blog_post = BlogPost.objects.get(slug=self.kwargs["blog_post_slug"])
        serializer.save(blog_post=blog_post)


# View for subscribers
class SubscribeView(generics.CreateAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get("email")
        if Subscriber.objects.filter(email=email).exists():
            return response.Response(
                {"detail": "Email already subscribed."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().create(request, *args, **kwargs)


# View for unsubscribing
class UnsubscribeView(generics.DestroyAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    lookup_field = "email"

    def delete(self, request, *args, **kwargs):
        email = self.kwargs["email"]
        subscriber = get_object_or_404(Subscriber, email=email)
        subscriber.delete()
        return response.Response(
            {"detail": "You have been unsubscribed and your data has been deleted."},
            status=status.HTTP_200_OK,
        )
