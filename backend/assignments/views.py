from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Assignment
from .serializers import AssignmentSerializer
from users.models import CustomUser

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assign_task(request):
    if request.user.role != 'admin':
        return Response({'detail': 'Not authorized'}, status=403)
    student_id = request.data.get('studentId')
    task = request.data.get('task')
    student = CustomUser.objects.get(id=student_id)
    assignment = Assignment.objects.create(student=student, task=task)
    serializer = AssignmentSerializer(assignment)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_assignments(request):
    if request.user.role != 'student':
        return Response({'detail': 'Not authorized'}, status=403)
    assignments = Assignment.objects.filter(student=request.user)
    serializer = AssignmentSerializer(assignments, many=True)
    return Response(serializer.data)
