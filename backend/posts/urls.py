from django.urls import path 
from .views import allPosts

urlpatterns = [
    path('', allPosts, name='all-posts'),
]