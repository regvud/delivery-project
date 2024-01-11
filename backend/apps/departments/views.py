from rest_framework import generics

from apps.departments.models import DepartmentModel
from apps.departments.serializers import DepartmentSerializer


class DepartmentListView(generics.ListAPIView):
    """
    GET method:
        Department list
    """

    queryset = DepartmentModel.objects.all()
    serializer_class = DepartmentSerializer


class DepartmentCreateView(generics.CreateAPIView):
    """
    POST method:
        Create new department
    """

    queryset = DepartmentModel
    serializer_class = DepartmentSerializer


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
