from django.urls import path

from .views import (
    ChangeEmailRequestView,
    ChangeEmailView,
    ChangePasswordView,
    ChangePhoneView,
    UserAvatarView,
    UserCreateView,
    UserDeliveriesView,
    UserListView,
    UserProfileView,
    UserRetrieveUpdateDestroyView,
)

urlpatterns = [
    path("", UserListView.as_view(), name="user_list"),
    path("/<int:pk>", UserRetrieveUpdateDestroyView.as_view(), name="user_crud"),
    path("/create", UserCreateView.as_view(), name="user_list"),
    path("/deliveries", UserDeliveriesView.as_view(), name="user_deliveries"),
    path("/profile", UserProfileView.as_view(), name="user_profile"),
    path("/add_avatar", UserAvatarView.as_view(), name="user_avatar"),
    path("/change_password", ChangePasswordView.as_view(), name="user_change_password"),
    path(
        "/change_email/<str:email>", ChangeEmailView.as_view(), name="user_change_email"
    ),
    path(
        "/request/change_email",
        ChangeEmailRequestView.as_view(),
        name="user_change_email_request",
    ),
    path("/change_phone", ChangePhoneView.as_view(), name="user_change_phone"),
]
