from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response, status

from apps.auth.serializers import EmailSerializer, PasswordSerializer
from apps.users.serializers import UserSerializer
from core.services.email_service import EmailService
from core.services.simple_jwt_service import ActivateToken, JwtService, RecoveryToken

UserModel = get_user_model()


class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return get_object_or_404(UserModel, pk=self.request.user.pk)


class ActivateUserView(generics.GenericAPIView):
    """
    POST:
        activate user
    """

    permission_classes = (AllowAny,)

    def post(self, *args, **kwargs):
        token = kwargs["token"]
        user = JwtService.validate_token(token, ActivateToken)
        user.is_active = True
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class RecoverPasswordRequestView(generics.GenericAPIView):
    """
    POST:
        recover password request
    """

    permission_classes = (IsAuthenticated,)
    serializer_class = EmailSerializer

    # provide email method
    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(UserModel, **serializer.data)

        EmailService.recover_password(user)
        return Response("check email", status.HTTP_202_ACCEPTED)


class RecoverPasswordView(generics.GenericAPIView):
    """
    POST:
        recover password
    """

    permission_classes = (IsAuthenticated,)
    serializer_class = PasswordSerializer

    def post(self, *args, **kwargs):
        data = self.request.data

        if not data:
            raise ValueError("Provide {'password' : '...your_password'} ")

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)

        user = JwtService.validate_token(self.kwargs["token"], RecoveryToken)

        user.set_password(data["password"])
        user.save()

        return Response("password has been changed", status.HTTP_202_ACCEPTED)
