from django.core import validators as V
from django.db import models
from rest_framework.authentication import get_user_model

from apps.deliveries.choices import SizeChoices, StatusChoices
from apps.departments.models import DepartmentModel
from core.models import BaseModel

UserModel = get_user_model()


class ItemModel(BaseModel):
    class Meta:
        db_table = "items"

    label = models.CharField(max_length=30)
    price = models.DecimalField(
        decimal_places=2,
        max_digits=7,
        validators=[V.MinValueValidator(0), V.MaxValueValidator(1000000)],
    )
    size = models.CharField(max_length=6, choices=SizeChoices.choices)


class DeliveryModel(BaseModel):
    class Meta:
        db_table = "deliveries"

    receiver = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="receiving"
    )
    item = models.OneToOneField(ItemModel, on_delete=models.CASCADE)
    sender = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="sending"
    )
    department = models.ForeignKey(
        DepartmentModel, on_delete=models.CASCADE, related_name="deliveries"
    )
    status = models.CharField(
        max_length=11, choices=StatusChoices.choices, default=StatusChoices.in_progress
    )
