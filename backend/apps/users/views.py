from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.authentication import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated

from apps.users.serializers import (
    UserDeliveriesSerializer,
    UserProfileSerializer,
    UserSerializer,
)
from core.permissions import IsAdmin

UserModel = get_user_model()


class UserListView(generics.ListAPIView):
    """
    GET method:
        User list
    """

    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsAdmin,)


class UserCreateView(generics.CreateAPIView):
    """
    GET method:
        Create new User
    """

    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET method:
        Receive user
    PATCH method:
        Update user
    PUT method:
        Fully update user
    DELETE method:
        Remove user
    """

    serializer_class = UserSerializer
    queryset = UserModel
    permission_classes = (IsAdmin, IsAuthenticated)


class UserDeliveriesView(generics.RetrieveAPIView):
    """
    GET method:
        View user deliveries
    """

    serializer_class = UserDeliveriesSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return get_object_or_404(UserModel, pk=self.request.user.pk)


class UserProfileView(generics.RetrieveAPIView):
    """
    GET method:
        View user profile
    """

    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return get_object_or_404(UserModel, pk=self.request.user.pk)
