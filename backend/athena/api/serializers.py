from rest_framework.serializers import ModelSerializer
from ..models import CourseUnit, Week, Video, Comment

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
        fields = ('id', 'title', 'description', 'uploaded_at', 'link', 'thumbnail', 'week_id')
        
class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'fullname', 'username', 'body', 'created_at', 'active', 'like', 'dislike', 'video_id', 'parent_comment_id')