from rest_framework import serializers

from apps.deliveries.serializers import DeliveryWithoutItemNestedSerializer
from apps.departments.models import DepartmentModel


class DepartmentSerializer(serializers.ModelSerializer):
    deliveries = DeliveryWithoutItemNestedSerializer(many=True, read_only=True)

    class Meta:
        model = DepartmentModel
        fields = (
            "id",
            "general_number",
            "staff_count",
            "capacity",
            "status",
            "deliveries",
        )
