from django_filters import rest_framework as filters
from rest_framework.authentication import get_user_model

UserModel = get_user_model()


class UserFilter(filters.FilterSet):
    order = filters.OrderingFilter(
        fields=(
            "id",
            "email",
            "phone",
            "is_superuser",
            "is_staff",
            "is_active",
        )
    )

    class Meta:
        model = UserModel
        fields = {
            "id": ("lt", "lte", "gt", "gte", "exact", "iexact"),
            "email": (
                "startswith",
                "endswith",
                "icontains",
                "contains",
                "exact",
                "iexact",
            ),
            "phone": (
                "startswith",
                "endswith",
                "icontains",
                "contains",
                "exact",
                "iexact",
            ),
            "is_staff": (
                "icontains",
                "contains",
                "exact",
                "iexact",
            ),
            "is_active": (
                "icontains",
                "contains",
                "exact",
                "iexact",
            ),
            "is_superuser": (
                "icontains",
                "contains",
                "exact",
                "iexact",
            ),
        }
