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
            phone = serializer.validated_data["receiver"]
            receiver = UserModel.objects.get(phone=phone)
            serializer.validated_data["receiver"] = receiver.pk

            data = dict(serializer.validated_data)
            serializer = DeliverySerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save(sender=sender)

        except UserModel.DoesNotExist:
            return Response({"details": "no user with this phone number found"})

        return Response(serializer.data, status.HTTP_201_CREATED)


class DeliveryInfoView(generics.GenericAPIView):
    queryset = DeliveryModel

    def get_delivery(self):
        return DeliveryModel.objects.get(pk=self.kwargs.get("pk"))

    def get_user(self, *args, **kwargs):
        return UserModel.objects.get(pk=kwargs["pk"])

    """
    GET method:
        Represents receiver and sender fields with phone numbers instead of table ids 
    """

    def get(self, *args, **kwargs):
        delivery = self.get_delivery()
        serializer = DeliveryWithSenderSerializer(delivery)

        receiver_id = serializer.data["receiver"]
        sender_id = serializer.data["sender"]

        receiver = self.get_user(pk=receiver_id).phone
        sender = self.get_user(pk=sender_id).phone

        info_serializer = DeliveryConvertedIdToPhoneNumberSerializer(
            data=serializer.data
        )
        info_serializer.is_valid(raise_exception=True)
        info_serializer.validated_data["receiver"] = receiver
        info_serializer.validated_data["sender"] = sender

        return Response(info_serializer.data, status.HTTP_200_OK)


class DeliveryReceiveView(generics.RetrieveUpdateAPIView):
    queryset = DeliveryModel
    serializer_class = DeliveryWithSenderSerializer

    def patch(self, *args, **kwargs):
        delivery = self.get_object()

        if delivery.status == "received":
            return Response("This delivery is received")

        delivery.status = "received"
        delivery.save()
        serializer = self.get_serializer(delivery)
        return Response(serializer.data, status.HTTP_202_ACCEPTED)


class DeliveryDeclineView(generics.RetrieveUpdateAPIView):
    queryset = DeliveryModel
    serializer_class = DeliveryWithSenderSerializer

    def patch(self, *args, **kwargs):
        delivery = self.get_object()

        if delivery.status == "declined":
            return Response("This delivery is declined")

        delivery.status = "declined"
        delivery.save()

        serializer = self.get_serializer(delivery)
        return Response(serializer.data, status.HTTP_202_ACCEPTED)
