from django.urls import path

from .views import (
    AddImageDelivery,
    DeliveryCreateView,
    DeliveryDeclineView,
    DeliveryInfoView,
    DeliveryListInfoView,
    DeliveryListView,
    DeliveryReceiveView,
    DeliveryRetrieveUpdateDestroyView,
)

urlpatterns = [
    path("", DeliveryListView.as_view(), name="delivery_list"),
    path("/create", DeliveryCreateView.as_view(), name="delivery_create"),
    path(
        "/<int:pk>", DeliveryRetrieveUpdateDestroyView.as_view(), name="delivery_crud"
    ),
    path("/<int:pk>/add_image", AddImageDelivery.as_view(), name="delivery_image"),
    path("/info", DeliveryListInfoView.as_view(), name="delivery_list_info"),
    path("/<int:pk>/info", DeliveryInfoView.as_view(), name="delivery_info"),
    path("/<int:pk>/receive", DeliveryReceiveView.as_view(), name="delivery_receive"),
    path("/<int:pk>/decline", DeliveryDeclineView.as_view(), name="delivery_decline"),
]
