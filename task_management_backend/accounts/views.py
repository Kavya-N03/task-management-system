from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from drf_yasg.utils import swagger_auto_schema


# Create your views here.
class RegisterView(APIView):
    
    @swagger_auto_schema(request_body=RegisterSerializer)
    def post(self,request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message':'User registered successfully',
                'user':serializer.data
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)