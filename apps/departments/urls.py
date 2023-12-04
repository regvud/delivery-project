from django.urls import path

from .views import DepartmentListView, DepartmentRetrieveUpdateDestroyView

urlpatterns = [
    path("", DepartmentListView.as_view()),
    path("/<int:pk>", DepartmentRetrieveUpdateDestroyView.as_view()),
]
