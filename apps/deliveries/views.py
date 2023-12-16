from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.fields import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Response

from apps.deliveries.choices import StatusChoices
from apps.deliveries.models import DeliveryModel
from apps.deliveries.serializers import (
    DeliveryConvertedFieldsSerializer,
    DeliveryDataSerializer,
    DeliverySerializer,
)
from apps.departments.models import DepartmentModel
from core.dataclasses.delivery_dataclass import DeliveryDataclass
from core.dataclasses.department_dataclass import DepartmentDataclass
from core.dataclasses.user_dataclass import UserDataclass

UserModel = get_user_model()


class DeliveryListView(generics.ListAPIView):
    queryset = DeliveryModel.objects.all()
    serializer_class = DeliverySerializer
    permission_classes = (IsAuthenticated,)


class DeliveryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DeliveryModel
    serializer_class = DeliverySerializer


class DeliveryCreateView(generics.CreateAPIView):
    serializer_class = DeliverySerializer

    def get_receiver(self, phone):
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
            data = self.request.data
            data["sender"] = self.request.user.pk

            # validate data with middleware serializer
            middleware_serializer = DeliveryDataSerializer(data=data)
            middleware_serializer.is_valid(raise_exception=True)

            # get receiver and department objects
            department: DepartmentDataclass = self.get_department(
                data.get("department")
            )
            receiver: UserDataclass = self.get_receiver(data.get("receiver"))

            # modify data for actual serializer
            middleware_serializer.validated_data["receiver"] = receiver.pk
            middleware_serializer.validated_data["department"] = department.pk

            serializer = self.get_serializer(data=middleware_serializer.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except ObjectDoesNotExist as e:
            return Response(str(e), status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeliveryInfoView(generics.RetrieveAPIView):
    """
    GET method:
        Represents receiver and sender fields with phone numbers instead of table ids
    """

    serializer_class = DeliveryConvertedFieldsSerializer

    def get_object(self):
        return get_object_or_404(DeliveryModel, pk=self.kwargs.get("pk"))


class DeliveryReceiveView(generics.UpdateAPIView):
    serializer_class = DeliverySerializer
    queryset = DeliveryModel

    def perform_update(self, serializer):
        serializer.validated_data["status"] = StatusChoices.received
        serializer.save()
        return super().perform_update(serializer)


class DeliveryDeclineView(generics.UpdateAPIView):
    queryset = DeliveryModel
    serializer_class = DeliverySerializer

    def perform_update(self, serializer):
        serializer.validated_data["status"] = StatusChoices.declined
        serializer.save()
        return super().perform_update(serializer)
