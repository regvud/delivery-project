from rest_framework import generics

from apps.departments.models import DepartmentModel
from apps.departments.serializers import DepartmentSerializer


class DepartmentListView(generics.ListAPIView):
    queryset = DepartmentModel.objects.all()
    serializer_class = DepartmentSerializer


class DepartmentCreateView(generics.CreateAPIView):
    queryset = DepartmentModel
    serializer_class = DepartmentSerializer


class DepartmentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DepartmentModel
    serializer_class = DepartmentSerializer
