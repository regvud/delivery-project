from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Response

from apps.departments.choices import RegionChoices
from apps.departments.models import DepartmentModel
from apps.departments.serializers import (
    DepartmentNumberSerializer,
    DepartmentSerializer,
)
from core.permissions import IsAdmin


class DepartmentListView(generics.ListAPIView):
    """
    GET method:
        Department list
    """

    queryset = DepartmentModel.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = (IsAuthenticated,)


class DepartmentNumberList(generics.ListAPIView):
    serializer_class = DepartmentNumberSerializer
    queryset = DepartmentModel.objects.all()
    permission_classes = (IsAuthenticated,)
    pagination_class = None


class DepartmentCreateView(generics.CreateAPIView):
    """
    POST method:
        Create new department
    """

    queryset = DepartmentModel
    serializer_class = DepartmentSerializer
    permission_classes = (IsAdmin,)


class DepartmentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET method:
        Receive department
    PATCH method:
        Update department
    PUT method:
        Fully update department
    DELETE method:
        Remove department
    """

    queryset = DepartmentModel
    serializer_class = DepartmentSerializer
    permission_classes = (IsAdmin,)


class GetDepartmentRegions(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, *args, **kwargs):
        return Response({"regions": RegionChoices.names})
