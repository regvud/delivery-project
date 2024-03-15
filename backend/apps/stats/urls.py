from django.urls import path

from .views import (
    AdminDeliveryListView,
    AverageDeliveryPrice,
    CurrentDayDeliveries,
    CurrentDayUsers,
    CurrentWeakDeliveriesView,
    CurrentWeakUsersView,
    PrevWeakDeliveriesView,
    PrevWeakUsersView,
    TotalDeliveries,
    TotalUsers,
)

urlpatterns = [
    path("/delivery_list", AdminDeliveryListView.as_view(), name="admin_del_list"),
    path("/total_users", TotalUsers.as_view(), name="total_user_count"),
    path("/total_deliveries", TotalDeliveries.as_view(), name="total_deliveries_count"),
    path(
        "/current_weak_deliveries",
        CurrentWeakDeliveriesView.as_view(),
        name="current_weak_deliveries",
    ),
    path(
        "/prev_weak_deliveries",
        PrevWeakDeliveriesView.as_view(),
        name="prev_weak_deliveries",
    ),
    path(
        "/current_weak_users",
        CurrentWeakUsersView.as_view(),
        name="current_weak_users",
    ),
    path(
        "/prev_weak_users",
        PrevWeakUsersView.as_view(),
        name="prev_weak_users",
    ),
    path("/today_users", CurrentDayUsers.as_view(), name="today_users"),
    path("/today_deliveries", CurrentDayDeliveries.as_view(), name="today_deliveries"),
    path("/avg_price", AverageDeliveryPrice.as_view(), name="avg_price"),
]
