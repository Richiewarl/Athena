from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
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
                  'description',
                  'created_on',
                  'updated_on')
        
class WeekSerializer(ModelSerializer):
    class Meta:
        model = Week
        fields = ('id', 
                  'title',
                  'description',
                  'created_on',
                  'updated_on', 
                  'course_unit')
        
class VideoSerializer(ModelSerializer):
    class Meta:
        model = Video
        fields = ('id', 
                  'title', 
                  'description', 
                  'created_on',
                  'updated_on', 
                  'link', 
                  'thumbnail', 
                  'week')
        
class CommentReadSerializer(ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Comment
        fields = ('id',
                  'user',
                  'body',
                  'created_on',
                  'updated_on', 
                  'active',
                  'video', 
                  'parent_comment')
        
class CommentWriteSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id',
                  'user',
                  'body',
                  'created_on',
                  'updated_on', 
                  'active',
                  'video', 
                  'parent_comment')
        
class LikeSerializer(ModelSerializer):
    class Meta:
        model = Like
        fields = ('id',
                  'user',
                  'created_on',
                  'updated_on')
        
class DislikeSerializer(ModelSerializer):
    class Meta:
        model = Dislike
        fields = ('id',
                  'user',
                  'created_on',
                  'updated_on')