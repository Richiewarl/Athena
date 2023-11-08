from rest_framework.serializers import ModelSerializer
from ..models import CourseUnit, Week, Video

class CourseUnitSerializer(ModelSerializer):
    class Meta:
        model = CourseUnit
        fields = ('id', 'course_code', 'title', 'description')
        
class WeekSerializer(ModelSerializer):
    class Meta:
        model = Week
        fields = ('id', 'title', 'course_unit_id')
        
class VideoSerializer(ModelSerializer):
    class Meta:
        model = Video
        fields = ('id', 'title', 'description', 'uploaded_at', 'week_id')