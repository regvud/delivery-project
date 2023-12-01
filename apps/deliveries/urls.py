from django.urls import path

from .views import (
    DeliveryCreateView,
    DeliveryInfoView,
    DeliveryListView,
    DeliveryRetrieveUpdateDestroyView,
)

urlpatterns = [
    path("", DeliveryListView.as_view(), name=""),
    path("/create", DeliveryCreateView.as_view(), name=""),
    path("/<int:pk>", DeliveryRetrieveUpdateDestroyView.as_view(), name=""),
    path("/<int:pk>/info", DeliveryInfoView.as_view(), name=""),
]
