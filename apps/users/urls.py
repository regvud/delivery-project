from django.urls import path

from .views import (
    UserDeliveriesView,
    UserListCreateView,
    UserProfileView,
    UserRetrieveUpdateDestroyView,
)

urlpatterns = [
    path("", UserListCreateView.as_view(), name=""),
    path("/<int:pk>", UserRetrieveUpdateDestroyView.as_view(), name=""),
    path("/deliveries", UserDeliveriesView.as_view(), name=""),
    path("/profile", UserProfileView.as_view(), name=""),
]
