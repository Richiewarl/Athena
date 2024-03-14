from rest_framework.serializers import ModelSerializer
from ..models import *

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 
                  'fullname',
                  'username',
                  'created_on',
                  'last_login',
                  'profile_picture',
                  'user_role',
                  'external_auth')

class CourseUnitSerializer(ModelSerializer):
    class Meta:
        model = CourseUnit
        fields = ('id', 
                  'course_code', 
                  'title', 
                  'description')
        
class WeekSerializer(ModelSerializer):
    class Meta:
        model = Week
        fields = ('id', 
                  'title',
                  'description' ,
                  'course_unit')
        
class VideoSerializer(ModelSerializer):
    class Meta:
        model = Video
        fields = ('id', 
                  'title', 
                  'description', 
                  'created_at',
                  'updated_at', 
                  'link', 
                  'thumbnail', 
                  'week')
        
class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id',
                  'user',
                  'body',
                  'created_at', 
                  'active',
                  'video', 
                  'parent_comment')
        
class Like(ModelSerializer):
    class Meta:
        model = Like
        fields = ('id',
                  'user',
                  'created_at',
                  'updated_at')
        
class Dislike(ModelSerializer):
    class Meta:
        model = Dislike
        fields = ('id',
                  'user',
                  'created_at',
                  'updated_at')