from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.views import Response

from apps.deliveries.models import DeliveryModel
from apps.deliveries.serializers import (
    DeliveryConvertedIdToPhoneNumberSerializer,
    DeliverySerializer,
    DeliveryUserPhoneExistanceCheckSerializer,
    DeliveryWithSenderSerializer,
)

UserModel = get_user_model()


class DeliveryListView(generics.ListAPIView):
    queryset = DeliveryModel.objects.all()
    serializer_class = DeliveryWithSenderSerializer


class DeliveryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DeliveryModel
    serializer_class = DeliveryWithSenderSerializer


class DeliveryCreateView(generics.GenericAPIView):
    serializer_class = DeliveryUserPhoneExistanceCheckSerializer

    def post(self, *args, **kwargs):
        data = self.request.data
        sender = self.request.user
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)

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


class DeliveryInfoView(generics.GenericAPIView):
    queryset = DeliveryModel

    def get_delivery(self):
        return DeliveryModel.objects.get(pk=self.kwargs.get("pk"))

    def get_user(self, *args, **kwargs):
        return UserModel.objects.get(pk=kwargs["pk"])

    """
    GET method:
        Represents reciever and sender fields with phone numbers instead of table ids 
    """

    def get(self, *args, **kwargs):
        delivery = self.get_delivery()
        serializer = DeliveryWithSenderSerializer(delivery)

        reciever_id = serializer.data["reciever"]
        sender_id = serializer.data["sender"]

        reciever = self.get_user(pk=reciever_id).phone
        sender = self.get_user(pk=sender_id).phone

        info_serializer = DeliveryConvertedIdToPhoneNumberSerializer(
            data=serializer.data
        )
        info_serializer.is_valid(raise_exception=True)
        info_serializer.validated_data["reciever"] = reciever
        info_serializer.validated_data["sender"] = sender

        return Response(info_serializer.data, status.HTTP_200_OK)
