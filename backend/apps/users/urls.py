from django.urls import path

from .views import (
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
]
