from apps.deliveries.choices import StatusChoices
from apps.deliveries.models import DeliveryModel
from configs.celery import app


class StatusService:
    @app.task
    def manage_status_service(*args, **options):
        deliveries = DeliveryModel.objects.all()

        for delivery in deliveries:
            if delivery.status == StatusChoices.in_progress:
                delivery.status = StatusChoices.ready

                delivery.save()

            return print("Delivery status has been changed!!!!!!!!")


StatusService.manage_status_service()
