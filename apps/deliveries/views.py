from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.views import Response

from apps.deliveries.models import DeliveryModel
from apps.deliveries.serializers import DeliverySerializer

UserModel = get_user_model()


class DeliveryListView(generics.ListAPIView):
    queryset = DeliveryModel.objects.all()
    serializer_class = DeliverySerializer


class DeliveryCreateView(generics.GenericAPIView):
    serializer_class = DeliverySerializer

    def post(self, *args, **kwargs):
        data = self.request.data
        user = self.request.user

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(sender=user)

        return Response(serializer.data, status.HTTP_200_OK)

    def get(self, *args, **kwargs):
        print(self.request.user)
        print(self.request.user)
        print(self.request.user)
        print(self.request.user)
        print(self.request.user)
        return Response("dsa")
