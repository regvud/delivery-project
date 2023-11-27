from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import MeView

urlpatterns = [
    path("", TokenObtainPairView.as_view(), name=""),
    path("/refresh", TokenRefreshView.as_view(), name=""),
    path("/me", MeView.as_view(), name=""),
]
