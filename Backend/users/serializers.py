from django.contrib.auth.models import User
from rest_framework import serializers

from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'name']
    def create(self, validated_data):
        print("Validated Data: ", validated_data)
        email = validated_data.get('email')
        password = validated_data.get('password')
        name = validated_data.get('name', None)

        if not email or not password:
            raise serializers.ValidationError("Email and password are required.")

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("A user with this email already exists.")

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
        )

        if name:
            user.first_name = name
            user.save()

        return user
    
    def validate(self, data):
        if User.objects.filter(email=data.get('email')).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return data
