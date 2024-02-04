import json

import requests
from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpRequest, request
from rest_framework import generics, status
from rest_framework.fields import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Response

from apps.deliveries.choices import StatusChoices
from apps.deliveries.models import DeliveryModel
from apps.deliveries.serializers import (
    DeliveryConvertedFieldsSerializer,
    DeliverySerializer,
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

    def get_receiver(self, phone):
        if phone == self.request.user.phone:
            raise Exception("You cannot send to yourself")

        try:
            receiver = UserModel.objects.get(phone=phone)
            return receiver
        except UserModel.DoesNotExist:
            raise ObjectDoesNotExist(
                "This phone number does not belong to any user, try another number"
            )

    def get_department(self, department):
        try:
            department = DepartmentModel.objects.get(general_number=department)
            return department
        except DepartmentModel.DoesNotExist:
            raise ObjectDoesNotExist(
                f"Department with general number {department} does not exist"
            )

    def post(self, *args, **kwargs):
        try:
            data = json.loads(self.request.data["data"])
            image_file = self.request.data["image"]

            with open("storage/images/" + image_file.name, "wb+") as destination:
                for chunk in image_file.chunks():
                    destination.write(chunk)

            image_path = f"storage/images/{image_file.name}"

            image = self.request.build_absolute_uri(settings.MEDIA_URL + image_path)

            department: DepartmentDataclass = self.get_department(
                data.get("department")
            )
            receiver: UserDataclass = self.get_receiver(data.get("receiver"))

            data["sender"] = self.request.user.pk
            data["department"] = department.id
            data["receiver"] = receiver.id

            item = data.get("item")
            item["image"] = image_file

            print(data)

            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)

            # serializer.save()

            return Response("ok", status=status.HTTP_201_CREATED)

        except ObjectDoesNotExist as e:
            return Response({"detail": str(e)}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


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
