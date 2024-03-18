from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status
from ..models import *
from .serializers import *

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=False, methods=['get'])
    def by_username(self, request):
        username = request.query_params.get('username')
        user = self.queryset.filter(username=username).first()
        
        if (user):
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data)
        else :
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class CourseUnitViewSet(ModelViewSet):
    queryset = CourseUnit.objects.all()
    serializer_class = CourseUnitSerializer
    
    @action(detail=True, methods=['get'])
    def weeks(self, request, pk=None):
        course_unit = self.get_object()
        weeks = Week.objects.filter(course_unit=course_unit)
        serializer = WeekSerializer(weeks, many=True)
        return Response(serializer.data)
    
class WeekViewSet(ModelViewSet):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer
    
    @action(detail=True, methods=['get'])
    def videos(self, request, pk=None):
        week = self.get_object()
        videos = Video.objects.filter(week=week)
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)
    
class VideoViewSet(ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        video = self.get_object()
        
        # filter root comments for a video
        comments = Comment.objects.filter(video=video)
        comments = comments.filter(parent_comment_id=None)
        comments = comments.order_by('-created_on')
        
        serializer = CommentReadSerializer(comments, many=True)
        return Response(serializer.data)   
    
class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentWriteSerializer
    
    @action(detail=True, methods=['get'])
    def replies(self, request, pk=None):
        comment = self.get_object()
        replies = Comment.objects.filter(parent_comment=comment)
        serializer = CommentReadSerializer(replies, many=True)
        return Response(serializer.data)  
    
    @action(detail=True, methods=['get'])
    def likes(self, request, pk=None):
        comment = self.get_object()
        likes =  Like.objects.filter(comment=comment)
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def dislikes(self, request, pk=None):
        comment = self.get_object()
        dislikes =  Dislike.objects.filter(comment=comment)
        serializer = DislikeSerializer(dislikes, many=True)
        return Response(serializer.data)
    
class LikeViewSet(ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    
class DislikeViewSet(ModelViewSet):
    queryset = Dislike.objects.all()
    serializer_class = DislikeSerializer
        