from django.urls import path

from .views import UserListCreateView, UserRetrieveUpdateDestroyView

urlpatterns = [
    path("", UserListCreateView.as_view(), name=""),
    path("/<int:pk>", UserRetrieveUpdateDestroyView.as_view(), name=""),
]
