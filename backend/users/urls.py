from django.urls import path
from .views import (
    students_list,
    me,
    admins_list,
    users_list,
    MyTokenObtainPairView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('students/', students_list, name='students_list'),
    path('admins/', admins_list, name='admins_list'),
    path('users/', users_list, name='users_list'),
    path('me/', me, name='me'),
]
