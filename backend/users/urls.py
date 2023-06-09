from django.urls import path 
from .views import userRegistration, userDetails, userName
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('registration/', userRegistration),
    path('details/', userDetails),
    path('user_name/<int:pk>', userName),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]