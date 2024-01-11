from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.authentication import get_user_model

from apps.users.serializers import (
    UserDeliveriesSerializer,
    UserProfileSerializer,
    UserSerializer,
)

UserModel = get_user_model()


class UserListView(generics.ListAPIView):
    """
    GET method:
        User list
    """

    serializer_class = UserSerializer
    queryset = UserModel.objects.all()


class UserCreateView(generics.CreateAPIView):
    """
    GET method:
        Create new User
    """

    serializer_class = UserSerializer


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


class UserDeliveriesView(generics.RetrieveAPIView):
    """
    GET method:
        View user deliveries
    """

    serializer_class = UserDeliveriesSerializer

    def get_object(self):
        return get_object_or_404(UserModel, pk=self.request.user.pk)


class UserProfileView(generics.RetrieveAPIView):
    """
    GET method:
        View user profile
    """

    serializer_class = UserProfileSerializer

    def get_object(self):
        return get_object_or_404(UserModel, pk=self.request.user.pk)
