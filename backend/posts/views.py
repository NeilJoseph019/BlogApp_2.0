from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allPosts(request):
    instance = Post.objects.all()
    serializer = PostSerializer(instance=instance, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def postComments(request):
    data = request.data
    serializer = CommentSerializer(data=data)
    return Response(serializer.data)