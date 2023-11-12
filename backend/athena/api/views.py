from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from ..models import CourseUnit, Week, Video
from .serializers import CourseUnitSerializer, WeekSerializer, VideoSerializer

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
         
class VideoViewSet(ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    