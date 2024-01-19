from rest_framework.permissions import BasePermission


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff)


class IsActive(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.active and not request.user.is_block)
