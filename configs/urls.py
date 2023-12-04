from django.urls import include, path

urlpatterns = [
    path("api/auth", include("apps.auth.urls")),
    path("api/users", include("apps.users.urls")),
    path("api/deliveries", include("apps.deliveries.urls")),
    path("api/departments", include("apps.departments.urls")),
]
