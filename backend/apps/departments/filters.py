from django_filters import rest_framework as filters

from apps.departments.models import DepartmentModel


class DepartmentFilter(filters.FilterSet):
    order = filters.OrderingFilter(
        fields=(
            "id",
            "general_number",
            "city",
            "staff_count",
            "capacity",
            "status",
        )
    )

    class Meta:
        model = DepartmentModel
        fields = {
            "id": ("lt", "lte", "gt", "gte", "exact", "iexact"),
            "general_number": ("lt", "lte", "gt", "gte", "exact"),
            "city": ("startswith", "endswith", "icontains", "exact", "iexact"),
            "capacity": ("lt", "lte", "gt", "gte", "exact", "iexact"),
            "staff_count": ("lt", "lte", "gt", "gte", "exact", "iexact"),
            "status": ("startswith", "endswith", "icontains", "exact", "iexact"),
        }
