import os

from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from rest_framework.authentication import get_user_model

from core.dataclasses.user_dataclass import UserDataclass
from core.services.simple_jwt_service import ActivateToken, JwtService, RecoveryToken

UserModel = get_user_model()


class EmailService:
    @staticmethod
    def __send_email(to: str, template_name: str, context: {}, subject=""):
        template = get_template(template_name)
        html_content = template.render(context)
        msg = EmailMultiAlternatives(
            subject, from_email=os.environ.get("EMAIL_HOST_USER"), to=[to]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()

    @classmethod
    def register_email(cls, user: UserDataclass):
        token = JwtService.create_token(user, ActivateToken)
        url = f"http://localhost:80/activate/{token}"
        cls.__send_email(
            user.email,
            "register.html",
            {"name": user.email, "url": url},
            "EMAIL ACCOUNT REGISTRATION",
        )

    @classmethod
    def recover_password(cls, user: UserDataclass):
        token = JwtService.create_token(user, RecoveryToken)
        url = f"http://localhost:80/recover/{token}"

        cls.__send_email(
            user.email, "recover_password.html", {"url": url}, "Recover Password letter"
        )
