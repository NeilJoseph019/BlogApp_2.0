from django.urls import path 
from .views import allPosts, userPosts, createNewPost

urlpatterns = [
    path('', allPosts),
    path('user_posts/', userPosts),
    path('create_new_post', createNewPost)
]