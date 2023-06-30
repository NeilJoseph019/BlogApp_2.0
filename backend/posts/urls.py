from django.urls import path 
from .views import allPosts, userPosts, createNewPost, updatePost, deletePost

urlpatterns = [
    path('', allPosts),
    path('user_posts/', userPosts),
    path('create_new_post/', createNewPost),
    path('update_post/<int:id>', updatePost),
    path('delete_post/<int:id>', deletePost),
]