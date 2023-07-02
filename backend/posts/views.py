from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allPosts(request):
    instance = Post.objects.all().order_by('-timestamp')
    serializer = PostSerializer(instance=instance, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userPosts(request):
    user = request.user 
    instance = Post.objects.filter(user=user).order_by('-timestamp')
    serializer = PostSerializer(instance=instance, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def postComments(request):
    data = request.data
    serializer = CommentSerializer(data=data)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createNewPost(request):
    
    data = {
        "user" : request.user,
        "description" : request.data['description'],
        "post_image" : request.FILES.get('post_image', None)  # This is the  method to get the files from the request data.
    }

    serializer = PostSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePost(request, id):
    instance = Post.objects.get(id=id)
    data = request.data
    serializer = PostSerializer(instance=instance, data=data, partial=True)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePost(request, id):
    
    try: 
        instance = Post.objects.get(id=id)
    except instance.DoesNotExist:
        return Response({'error': 'Task not found.'})
    serializer = PostSerializer(instance=instance) 
    instance.delete()
    # Optionally, you can also delete the task directly from the database
    # post.delete()
    return Response(serializer.data)
    
