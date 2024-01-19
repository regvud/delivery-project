from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.departments.models import DepartmentModel
from apps.departments.serializers import DepartmentSerializer
from core.permissions import IsAdmin


class DepartmentListView(generics.ListAPIView):
    """
    GET method:
        Department list
    """

    queryset = DepartmentModel.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = (IsAuthenticated,)


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
