from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.views import Response

from apps.deliveries.models import DeliveryModel
from apps.deliveries.serializers import (
    DeliverySerializer,
    DeliveryUserPhoneExistanceCheckSerializer,
    DeliveryWithSenderSerializer,
)

UserModel = get_user_model()


class DeliveryListView(generics.ListAPIView):
    queryset = DeliveryModel.objects.all()
    serializer_class = DeliveryWithSenderSerializer


class DeliveryCreateView(generics.GenericAPIView):
    serializer_class = DeliveryUserPhoneExistanceCheckSerializer

    def post(self, *args, **kwargs):
        data = self.request.data
        sender = self.request.user
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)

        print(data)

        try:
            phone = serializer.validated_data["reciever"]
            reciever = UserModel.objects.get(phone=phone)
            serializer.validated_data["reciever"] = reciever.pk

            data = dict(serializer.validated_data)
            serializer = DeliverySerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save(sender=sender)

        except UserModel.DoesNotExist:
            return Response({"details": "no user with this phone number found"})

        return Response(serializer.data, status.HTTP_200_OK)


class DeliveryDetailRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DeliveryModel
    serializer_class = DeliveryWithSenderSerializer
