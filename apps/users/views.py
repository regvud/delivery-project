from rest_framework import generics, status
from rest_framework.authentication import get_user_model
from rest_framework.views import Response

from apps.users.serializers import UserDeliveriesSerializer, UserSerializer

UserModel = get_user_model()


class UserListCreateView(generics.ListCreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserModel
    serializer_class = UserSerializer


class UserDeliveriesView(generics.GenericAPIView):
    def get(self, *args, **kwargs):
        user = self.request.user
        serializer = UserDeliveriesSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)
