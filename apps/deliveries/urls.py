from django.urls import path

from .views import (
    DeliveryCreateView,
    DeliveryDeclineView,
    DeliveryInfoView,
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
    path("/<int:pk>/info", DeliveryInfoView.as_view(), name="delivery_info"),
    path("/<int:pk>/receive", DeliveryReceiveView.as_view(), name="delivery_receive"),
    path("/<int:pk>/decline", DeliveryDeclineView.as_view(), name="delivery_decline"),
]
