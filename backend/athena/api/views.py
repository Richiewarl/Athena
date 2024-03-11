from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import pagination, generics
from ..models import CourseUnit, Week, Video, Comment
from .serializers import CourseUnitSerializer, WeekSerializer, VideoSerializer, CommentSerializer

class CourseUnitViewSet(ModelViewSet):
    queryset = CourseUnit.objects.all()
    serializer_class = CourseUnitSerializer
    
    @action(detail=True, methods=['get'])
    def weeks(self, request, pk=None):
        course_unit = self.get_object()
        weeks = Week.objects.filter(course_unit_id=course_unit)
        serializer = WeekSerializer(weeks, many=True)
        return Response(serializer.data)
    
class WeekViewSet(ModelViewSet):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer
    
    @action(detail=True, methods=['get'])
    def videos(self, request, pk=None):
        week = self.get_object()
        videos = Video.objects.filter(week_id=week)
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)
    
class VideoCommentPagination(pagination.PageNumberPagination):
    page_size = 10  
class VideoViewSet(ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    pagination_class = VideoCommentPagination

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        video = self.get_object()
        
        # filter root comments for a video
        comments = Comment.objects.filter(video_id=video)
        comments = Comment.objects.filter(parent_comment_id=None)
        
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    @action(detail=True, methods=['get'])
    def replies(self, request, pk=None):
        comment = self.get_object()
        replies = Comment.objects.filter(parent_comment_id=comment)
        serializer = CommentSerializer(replies, many=True)
        return Response(serializer.data)
    
