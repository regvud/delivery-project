from django.urls import path

from .views import (
    AdminDeliveryListView,
    AverageDeliveryPrice,
    CurrentDayDeliveries,
    CurrentDayUsers,
    TotalDeliveries,
    TotalUsers,
)

urlpatterns = [
    path("/delivery_list", AdminDeliveryListView.as_view(), name="admin_del_list"),
    path("/total_users", TotalUsers.as_view(), name="total_user_count"),
    path("/total_deliveries", TotalDeliveries.as_view(), name="total_deliveries_count"),
    path("/today_users", CurrentDayUsers.as_view(), name="today_users"),
    path("/today_deliveries", CurrentDayDeliveries.as_view(), name="today_deliveries"),
    path("/avg_price", AverageDeliveryPrice.as_view(), name="avg_price"),
]
