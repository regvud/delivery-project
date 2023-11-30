from rest_framework import generics
from rest_framework.authentication import get_user_model

from apps.users.serializers import UserSerializer

UserModel = get_user_model()


class UserListCreateView(generics.ListCreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserModel
    serializer_class = UserSerializer
