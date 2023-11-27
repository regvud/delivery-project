from rest_framework import generics
from rest_framework.views import Response, status

from apps.users.serializers import UserSerializer


class MeView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def get(self, *args, **kwargs):
        serializer = self.get_serializer(self.request.user)
        return Response(serializer.data, status.HTTP_200_OK)
