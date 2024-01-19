from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import ActivateUserView, MeView, RecoverPasswordRequestView

urlpatterns = [
    path("", TokenObtainPairView.as_view(), name=""),
    path("/refresh", TokenRefreshView.as_view(), name=""),
    path("/me", MeView.as_view(), name=""),
    path(
        "/recover/request",
        RecoverPasswordRequestView.as_view(),
        name="password_recover_request",
    ),
    path(
        "/recover/<str:token>",
        RecoverPasswordRequestView.as_view(),
        name="password_recover",
    ),
    path(
        "/activate/<str:token>",
        ActivateUserView.as_view(),
        name="user_activate",
    ),
]
