from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.authentication import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response

from apps.users.models import AvatarModel
from apps.users.serializers import (
    AvatarSerializer,
    UserDeliveriesSerializer,
    UserProfileSerializer,
    UserSerializer,
)
from core.dataclasses.user_dataclass import UserDataclass
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


class UserAvatarView(generics.GenericAPIView):
    serializer_class = AvatarSerializer

    def post(self, *args, **kwargs):
        avatar = self.request.data.get("avatar")
        user_id = self.request.user.pk
        data = {"user_id": user_id, "avatar": avatar}

        prev_avatar = AvatarModel.objects.filter(user_id=user_id).first()

        if prev_avatar and prev_avatar.avatar:
            default_storage.delete(prev_avatar.avatar.path)
        if prev_avatar:
            serializer = self.get_serializer(prev_avatar, data=data, partial=True)
        else:
            serializer = self.get_serializer(data=data)

        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=user_id)

        return Response(serializer.data, status.HTTP_200_OK)
