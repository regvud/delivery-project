from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Response

from apps.deliveries.choices import StatusChoices
from apps.deliveries.models import DeliveryModel
from apps.deliveries.serializers import (
    DeliveryConvertedIdToPhoneNumberSerializer,
    DeliverySerializer,
    DeliveryWithSenderSerializer,
)
from apps.departments.models import DepartmentModel

UserModel = get_user_model()


class DeliveryListView(generics.ListAPIView):
    queryset = DeliveryModel.objects.all()
    serializer_class = DeliveryWithSenderSerializer
    permission_classes = (IsAuthenticated,)


class DeliveryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DeliveryModel
    serializer_class = DeliveryWithSenderSerializer


class DeliveryCreateView(generics.CreateAPIView):
    serializer_class = DeliverySerializer
    queryset = DeliveryModel.objects.all()

    def get_receiver(self, phone):
        try:
            return UserModel.objects.get(phone=phone)
        except UserModel.DoesNotExist:
            return None

    def get_department(self, general_number):
        try:
            return DepartmentModel.objects.get(general_number=general_number)
        except DepartmentModel.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        data = request.data
        sender = request.user

        # Retrieve the receiver and department objects
        receiver = self.get_receiver(data.get("receiver"))
        department = self.get_department(data.get("department"))

        if not receiver:
            return Response(
                "User with this phone number does not exist",
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not department:
            return Response(
                "Department does not exist",
                status=status.HTTP_400_BAD_REQUEST,
            )

        data["receiver"] = receiver.pk
        data["department"] = department.pk

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(sender=sender)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DeliveryInfoView(generics.GenericAPIView):
    """
    GET method:
        Represents receiver and sender fields with phone numbers instead of table ids
    """

    def get(self, *args, **kwargs):
        delivery = get_object_or_404(DeliveryModel, pk=self.kwargs.get("pk"))
        serializer = DeliveryWithSenderSerializer(delivery)

        receiver_id = serializer.data["receiver"]
        sender_id = serializer.data["sender"]
        department_id = serializer.data["department"]

        receiver = get_object_or_404(UserModel, pk=receiver_id).phone
        sender = get_object_or_404(UserModel, pk=sender_id).phone
        department = get_object_or_404(DepartmentModel, pk=department_id).general_number

        info_serializer = DeliveryConvertedIdToPhoneNumberSerializer(
            data=serializer.data
        )

        info_serializer.is_valid(raise_exception=True)
        info_serializer.validated_data["receiver"] = receiver
        info_serializer.validated_data["sender"] = sender
        info_serializer.validated_data["department"] = department

        return Response({"info": info_serializer.data}, status.HTTP_200_OK)


class DeliveryReceiveView(generics.RetrieveUpdateAPIView):
    queryset = DeliveryModel
    serializer_class = DeliveryWithSenderSerializer

    def patch(self, *args, **kwargs):
        delivery = self.get_object()

        match delivery.status:
            case "in progress":
                return Response("This delivery is not ready for pick up")
            case "received":
                return Response("This delivery is received")

        delivery.status = StatusChoices.recieved
        delivery.save()
        serializer = self.get_serializer(delivery)
        return Response(serializer.data, status.HTTP_202_ACCEPTED)


class DeliveryDeclineView(generics.RetrieveUpdateAPIView):
    queryset = DeliveryModel
    serializer_class = DeliveryWithSenderSerializer

    def patch(self, *args, **kwargs):
        delivery = self.get_object()

        if delivery.status == StatusChoices.declined:
            return Response("This delivery is declined")

        delivery.status = StatusChoices.declined
        delivery.save()

        serializer = self.get_serializer(delivery)
        return Response(serializer.data, status.HTTP_202_ACCEPTED)
