from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def students_list(request):
    if request.user.role != 'admin':
        return Response({'detail': 'Not authorized'}, status=403)
    students = CustomUser.objects.filter(role='student')
    serializer = UserSerializer(students, many=True)
    return Response(serializer.data)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admins_list(request):
    if request.user.role != 'admin':
        return Response({'detail': 'Not authorized'}, status=403)
    admins = CustomUser.objects.filter(role='admin')
    serializer = UserSerializer(admins, many=True)
    return Response(serializer.data)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def users_list(request):
    if request.user.role != 'admin':
        return Response({'detail': 'Not authorized'}, status=403)
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairView(TokenObtainPairView):
    # Use default serializer or customize if needed
    pass

@api_view(['POST'])
def register(request):
    data = request.data
    if CustomUser.objects.filter(username=data['username']).exists():
        return Response({'detail': 'Username already exists'}, status=400)
    user = CustomUser.objects.create_user(
        username=data['username'],
        password=data['password'],
        role='student'
    )
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user(request):
    if request.user.role != 'admin':
        return Response({'detail': 'Not authorized'}, status=403)
    data = request.data
    if CustomUser.objects.filter(username=data['username']).exists():
        return Response({'detail': 'Username already exists'}, status=400)
    user = CustomUser.objects.create_user(
        username=data['username'],
        password=data['password'],
        role=data.get('role', 'student')
    )
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, pk):
    if request.user.role != 'admin':
        return Response({'detail': 'Not authorized'}, status=403)
    try:
        user = CustomUser.objects.get(pk=pk)
        user.delete()
        return Response({'detail': 'User deleted'})
    except CustomUser.DoesNotExist:
        return Response({'detail': 'User not found'}, status=404)