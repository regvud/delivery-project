from django.urls import path

from .views import (
    DepartmentCreateView,
    DepartmentListView,
    DepartmentRetrieveUpdateDestroyView,
)

urlpatterns = [
    path("", DepartmentListView.as_view(), name="department_list"),
    path(
        "/<int:pk>",
        DepartmentRetrieveUpdateDestroyView.as_view(),
        name="department_crud",
    ),
    path("/create", DepartmentCreateView.as_view(), name="department_create"),
]
