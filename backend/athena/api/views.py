from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from ..models import CourseUnit, Week, Video
from .serializers import CourseUnitSerializer, WeekSerializer, VideoSerializer

class CourseUnitViewSet(ModelViewSet):
    queryset = CourseUnit.objects.all()
    serializer = CourseUnitSerializer
    
class WeekViewSet(ModelViewSet):
    queryset = Week.objects.all()
    serializer = WeekSerializer
    
class VideoViewSet(ModelViewSet):
    queryset = Video.objects.all()
    serializer = VideoSerializer
    