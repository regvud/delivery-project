from datetime import datetime

from django.db.models import Avg
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from apps.auth.views import UserModel
from apps.deliveries.models import DeliveryModel
from apps.stats.serializers import DeliveryStatsSerializer
from core.permissions import IsAdmin


class TotalUsers(GenericAPIView):
    def get(self, *args, **kwargs):
        total = UserModel.objects.all().count()
        return Response({"data": total})


class TotalDeliveries(GenericAPIView):
    def get(self, *args, **kwargs):
        total = DeliveryModel.objects.all().count()
        return Response({"data": total})


class CurrentDayUsers(GenericAPIView):
    def get(self, *args, **kwargs):
        today = datetime.today().date()
        today_users = UserModel.objects.filter(created_at__date=today).count()
        return Response({"data": today_users})


class CurrentDayDeliveries(GenericAPIView):
    def get(self, *args, **kwargs):
        today = datetime.today().date()
        today_deliveries = DeliveryModel.objects.filter(created_at__date=today).count()
        return Response({"data": today_deliveries})


class AverageDeliveryPrice(GenericAPIView):
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
    # filterset_class = DeliveryFilter
