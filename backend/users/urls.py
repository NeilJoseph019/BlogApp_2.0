from django.urls import path 
from .views import userRegistration

urlpatterns = [
    path('registration/', userRegistration)
]