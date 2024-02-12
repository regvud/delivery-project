from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Response

from apps.departments.choices import RegionChoices
from apps.departments.filters import DepartmentFilter
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
    filterset_class = DepartmentFilter


class ActiveDepartmentListView(generics.ListAPIView):
    """
    GET method:
        Active department list
    """

    queryset = DepartmentModel.objects.filter(status=True)
    serializer_class = DepartmentNumberSerializer
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

    def get_permissions(self):
        if self.request.method == "GET":
            permission_classes = (IsAuthenticated,)
        else:
            permission_classes = (IsAdmin,)
        return [permission() for permission in permission_classes]


class GetDepartmentRegions(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, *args, **kwargs):
        return Response({"regions": RegionChoices.names})
