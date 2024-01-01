from apps.deliveries.choices import StatusChoices
from apps.deliveries.models import DeliveryModel
from configs.celery import app


class StatusService:
    @staticmethod
    def manage_status_service(*args, **options):
        deliveries = DeliveryModel.objects.all()

        for delivery in deliveries:
            if delivery.status == StatusChoices.in_progress:
                delivery.status = StatusChoices.ready
                delivery.save()

        print("Delivery statuses have been changed!!!!!!!!")

    @classmethod
    @app.task
    def start(cls):
        cls.manage_status_service
