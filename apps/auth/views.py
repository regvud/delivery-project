from rest_framework import generics
from rest_framework.views import Response, status

from apps.users.serializers import UserSerializer


class MeView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def get(self, *args, **kwargs):
        user = self.request.user
        return Response(f"{user}", status.HTTP_200_OK)
