from django.contrib.auth import authenticate
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ValidationError
from .serializers import RegisterSerializer, LoginSerializer

class RegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # Import get_user_model() inside the method to avoid early import
        from django.contrib.auth import get_user_model

        User = get_user_model()

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            email = request.data.get("email")
            password = request.data.get("password")

            # Check for existing email
            if User.objects.filter(email=email).exists():
                return Response({'email': ['This email is already registered.']}, status=status.HTTP_400_BAD_REQUEST)

            # Check password strength
            if len(password) < 8 or not any(char.isdigit() for char in password) or not any(char.islower() for char in password) or not any(char.isupper() for char in password):
                return Response({'password': ['Password is too weak. It should contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.']}, status=status.HTTP_400_BAD_REQUEST)

            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            return Response({
                'access': str(access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # Import get_user_model() inside the method to avoid early import
        from django.contrib.auth import get_user_model

        User = get_user_model()

        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(username=email, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                access_token = refresh.access_token
                return Response({
                    'access': str(access_token),
                    'refresh': str(refresh)
                }, status=status.HTTP_200_OK)
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
