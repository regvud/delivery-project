from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics

from apps.users.serializers import UserSerializer

UserModel = get_user_model()


class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return get_object_or_404(UserModel, pk=self.request.user.pk)
