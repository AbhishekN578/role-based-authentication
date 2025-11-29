"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import students_list, register, create_user, delete_user, users_list, me
from assignments.views import assign_task, my_assignments

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/students/', students_list, name='students_list'),
    path('api/assignments/', assign_task, name='assign_task'),
    path('api/my-assignments/', my_assignments, name='my_assignments'),
    path('api/register/', register, name='register'),
    path('api/users/', users_list, name='users_list'),
    path('api/users/create/', create_user, name='create_user'),
    path('api/users/<int:pk>/delete/', delete_user, name='delete_user'),
    path('api/me/', me, name='me'),
]
