CELERY_BROKER_URL = "redis://redis:6379/0"
result_backend = "django-db"
accept_content = ["application/json"]
task_serializer = "json"
result_serializer = "json"

CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"
