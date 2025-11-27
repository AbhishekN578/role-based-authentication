from django.db import models
from users.models import CustomUser

class Assignment(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='assignments')
    task = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
