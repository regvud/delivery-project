from django_filters import rest_framework as filters

from apps.deliveries.models import DeliveryModel


class DeliveryFilter(filters.FilterSet):
    order = filters.OrderingFilter(
        fields=(
            "id",
            "item",
            "sender",
            "receiver",
            "department",
            "status",
        )
    )

    class Meta:
        model = DeliveryModel
        fields = {
            "id": ("lt", "lte", "gt", "gte", "exact", "iexact"),
            "sender__phone": ("exact", "startswith", "endswith"),
            "receiver__phone": ("exact", "startswith", "endswith"),
            "department__id": ("lt", "lte", "gt", "gte", "exact", "iexact"),
            "department__general_number": ("lt", "lte", "gt", "gte", "exact", "iexact"),
            "department__city": ("exact", "startswith", "endswith"),
            "department__capacity": ("lt", "lte", "gt", "gte", "exact", "iexact"),
            "department__staff_count": ("lt", "lte", "gt", "gte", "exact", "iexact"),
            "department__status": ("exact", "startswith", "endswith"),
            "item__size": ("startswith", "endswith", "icontains", "exact", "iexact"),
            "item__label": ("startswith", "endswith", "icontains", "exact", "iexact"),
            "item__price": (
                "startswith",
                "endswith",
                "icontains",
                "exact",
                "iexact",
                "lt",
                "lte",
                "gt",
                "gte",
            ),
        }
