from django.urls import path

from .views import (
    ActiveDepartmentListView,
    DepartmentCreateView,
    DepartmentListView,
    DepartmentRetrieveUpdateDestroyView,
    GetDepartmentRegions,
)

urlpatterns = [
    path("", DepartmentListView.as_view(), name="department_list"),
    path(
        "/<int:pk>",
        DepartmentRetrieveUpdateDestroyView.as_view(),
        name="department_crud",
    ),
    path("/create", DepartmentCreateView.as_view(), name="department_create"),
    path("/regions", GetDepartmentRegions.as_view(), name="department_regions"),
    path("/active", ActiveDepartmentListView.as_view(), name="active_departments"),
]
