from django.core import validators as V
from django.db import models

from core.models import BaseModel


class DepartmentModel(BaseModel):
    class Meta:
        db_table = "departments"

    general_number = models.IntegerField(unique=True)
    city = models.CharField(max_length=50)
    capacity = models.IntegerField(
        validators=[V.MinValueValidator(100), V.MaxValueValidator(1000)]
    )
    staff_count = models.IntegerField(
        validators=[V.MinValueValidator(5), V.MaxValueValidator(30)]
    )
    status = models.BooleanField(default=True)
