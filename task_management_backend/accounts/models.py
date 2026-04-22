from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    ROLES_CHOICES =[
        ('admin','ADMIN'),
        ('user','USER'),
    ]
    
    role = models.CharField(max_length=25,choices=ROLES_CHOICES,default="user")
    
    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.role = 'admin'
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.username} ({self.role})"