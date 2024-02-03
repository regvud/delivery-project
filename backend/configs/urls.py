from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path

from configs.settings import MEDIA_URL

urlpatterns = [
    path("api/auth", include("apps.auth.urls")),
    path("api/users", include("apps.users.urls")),
    path("api/deliveries", include("apps.deliveries.urls")),
    path("api/departments", include("apps.departments.urls")),
]

urlpatterns += static(MEDIA_URL, document_root=settings.MEDIA_ROOT)
