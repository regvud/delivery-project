from django.urls import path

from .views import UserDeliveriesView, UserListCreateView, UserRetrieveUpdateDestroyView

urlpatterns = [
    path("", UserListCreateView.as_view(), name=""),
    path("/<int:pk>", UserRetrieveUpdateDestroyView.as_view(), name=""),
    path("/<int:pk>/deliveries", UserDeliveriesView.as_view(), name=""),
]
