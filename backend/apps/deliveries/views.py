import json

from django.contrib.auth import get_user_model
from django.db.transaction import atomic
from rest_framework import generics, status
from rest_framework.fields import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Response

from apps.deliveries.choices import StatusChoices
from apps.deliveries.models import DeliveryModel
from apps.deliveries.serializers import (
    DeliveryConvertedFieldsSerializer,
    DeliverySerializer,
    ItemImageSerializer,
    ItemSerializer,
)
from apps.departments.models import DepartmentModel
from core.dataclasses.department_dataclass import DepartmentDataclass
from core.dataclasses.user_dataclass import UserDataclass

UserModel = get_user_model()


class DeliveryListView(generics.ListAPIView):
    """
    GET method:
        Delivery list
    """

    queryset = DeliveryModel.objects.all()
    serializer_class = DeliveryConvertedFieldsSerializer
    permission_classes = (IsAuthenticated,)


class DeliveryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET method:
        Receive delivery
    PATCH method:
        Update delivery
    PUT method:
        Fully update delivery
    DELETE method:
        Remove delivery
    """

    queryset = DeliveryModel
    serializer_class = DeliverySerializer
    permission_classes = (IsAuthenticated,)


class DeliveryCreateView(generics.CreateAPIView):
    """
    POST method:
        Create new delivery
    """

    serializer_class = DeliverySerializer
    permission_classes = (IsAuthenticated,)

    def get_receiver(self, phone) -> int:
        if phone == self.request.user.phone:
            raise Exception("You cannot send to yourself")

        try:
            receiver = UserModel.objects.get(phone=phone)
            return receiver.id
        except UserModel.DoesNotExist:
            raise ObjectDoesNotExist(
                "This phone number does not belong to any user, try another number"
            )

    def get_department(self, department) -> int:
        try:
            department = DepartmentModel.objects.get(general_number=department)
            return department.id
        except DepartmentModel.DoesNotExist:
            raise ObjectDoesNotExist(
                f"Department with general number {department} does not exist"
            )

    @atomic
    def post(self, *args, **kwargs):
        # for front mb
        # data = self.request.data.get("data")

        data = json.loads(self.request.data.get("data"))
        image = self.request.data.get("image")

        item = data.pop("item")

        image_serializer = ItemImageSerializer(data={"image": image})
        image_serializer.is_valid(raise_exception=True)

        item["image"] = [{"image": image_serializer.validated_data["image"]}]

        item_serializer = ItemSerializer(data=item)
        item_serializer.is_valid(raise_exception=True)

        validated_item = item_serializer.validated_data

        department_id = self.get_department(data.get("department"))
        receiver_id = self.get_receiver(data.get("receiver"))

        data["sender"] = self.request.user.pk
        data["department"] = department_id
        data["receiver"] = receiver_id
        data["item"] = validated_item

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status.HTTP_201_CREATED)


class DeliveryInfoView(generics.RetrieveAPIView):
    """
    GET method:
        Represents receiver and sender fields with phone numbers instead of table ids
    """

    queryset = DeliveryModel
    serializer_class = DeliveryConvertedFieldsSerializer
    permission_classes = (IsAuthenticated,)


class DeliveryReceiveView(generics.UpdateAPIView):
    """
    GET method:
        Receive delivery
    """

    queryset = DeliveryModel
    serializer_class = DeliverySerializer
    permission_classes = (IsAuthenticated,)

    def perform_update(self, serializer):
        serializer.save(status=StatusChoices.received)


class DeliveryDeclineView(generics.UpdateAPIView):
    """
    GET method:
        Decline delivery
    """

    queryset = DeliveryModel
    serializer_class = DeliverySerializer
    permission_classes = (IsAuthenticated,)

    def perform_update(self, serializer):
        serializer.save(status=StatusChoices.declined)
