from rest_framework import serializers
from .models import User
import re

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ["username","email","password"]
    
    def create(self,validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(
            **validated_data,
            role='user'
        )
        user.set_password(password)
        user.save()
        return user
    
    def validate_username(self,value):
        if " " in value:
            raise serializers.ValidationError("Username should not contain space")
        return value

    def validate_password(self,value):
        if len(value)<6:
            raise serializers.ValidationError("Password must be at least 6 characters long")
        
        if not re.search(r'[A-Z]',value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter")

        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter")

        if not re.search(r'[0-9]',value):
            raise serializers.ValidationError("Password must contain at least one number")
        
        return value


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","email","role"]