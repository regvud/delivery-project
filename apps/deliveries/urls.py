from django.urls import path

from .views import DeliveryCreateView, DeliveryListView

urlpatterns = [
    path("", DeliveryListView.as_view(), name=""),
    path("/create", DeliveryCreateView.as_view(), name=""),
]
