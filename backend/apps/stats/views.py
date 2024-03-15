from datetime import datetime, timedelta

from django.db.models import Avg, Q
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response

from apps.auth.views import UserModel
from apps.deliveries.filters import DeliveryFilter
from apps.deliveries.models import DeliveryModel
from apps.stats.serializers import DeliveryStatsSerializer
from core.permissions import IsAdmin


class TotalUsers(GenericAPIView):
    permission_classes = (IsAdmin,)

    def get(self, *args, **kwargs):
        total = UserModel.objects.all().count()
        return Response({"total_users": total})


class TotalDeliveries(GenericAPIView):
    permission_classes = (IsAdmin,)

    def get(self, *args, **kwargs):
        total = DeliveryModel.objects.all().count()
        return Response({"total_deliveries": total})


today = datetime.today().date()


class CurrentDayUsers(GenericAPIView):
    permission_classes = (IsAdmin,)

    def get(self, *args, **kwargs):
        today_users = UserModel.objects.filter(created_at__date=today).count()
        return Response({"today_users": today_users})


class CurrentDayDeliveries(GenericAPIView):
    permission_classes = (IsAdmin,)

    def get(self, *args, **kwargs):
        today_deliveries = DeliveryModel.objects.filter(created_at__date=today).count()
        return Response({"today_deliveries": today_deliveries})


current_date = datetime.now()


class CurrentWeakDeliveriesView(GenericAPIView):
    start = current_date - timedelta(days=7)
    permission_classes = (IsAdmin,)
    queryset = DeliveryModel.objects.filter(created_at__range=(start, current_date))

    def get(self, *args, **kwargs):
        return Response({"current_weak_deliveries": self.get_queryset().count()})


class CurrentWeakUsersView(GenericAPIView):
    start = current_date - timedelta(days=7)
    permission_classes = (IsAdmin,)
    queryset = UserModel.objects.filter(is_active=True).filter(
        created_at__range=(start, current_date)
    )

    def get(self, *args, **kwargs):
        return Response({"current_weak_users": self.get_queryset().count()})


class PrevWeakUsersView(GenericAPIView):
    start = current_date - timedelta(days=14)
    end = current_date - timedelta(days=7)
    permission_classes = (IsAdmin,)
    queryset = UserModel.objects.filter(is_active=True).filter(
        created_at__range=(start, end)
    )

    def get(self, *args, **kwargs):
        return Response({"prev_weak_users": self.get_queryset().count()})


class PrevWeakDeliveriesView(GenericAPIView):
    start = current_date - timedelta(days=14)
    end = current_date - timedelta(days=7)
    permission_classes = (IsAdmin,)
    queryset = DeliveryModel.objects.filter(created_at__range=(start, end))

    def get(self, *args, **kwargs):
        return Response({"prev_weak_deliveries": self.get_queryset().count()})


class AverageDeliveryPrice(GenericAPIView):
    permission_classes = (IsAdmin,)

    def get(self, *args, **kwargs):
        aggregated_price = DeliveryModel.objects.aggregate(Avg("item__price")).get(
            "item__price__avg"
        )
        avg_price = round(aggregated_price, 2)
        return Response({"avg_price": avg_price})


class AdminDeliveryListView(ListAPIView):
    """
    GET method:
        Admin delivery list
    """

    queryset = DeliveryModel.objects.all()
    serializer_class = DeliveryStatsSerializer
    permission_classes = (IsAdmin,)
    filterset_class = DeliveryFilter
