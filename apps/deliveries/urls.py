from django.urls import path

from .views import (
    DeliveryCreateView,
    DeliveryDetailRetrieveUpdateDestroyView,
    DeliveryListView,
)

urlpatterns = [
    path("", DeliveryListView.as_view(), name=""),
    path("/create", DeliveryCreateView.as_view(), name=""),
    path("/<int:pk>", DeliveryDetailRetrieveUpdateDestroyView.as_view(), name=""),
]