from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class User(models.Model):
    fullname = models.CharField(max_length=300)
    username = models.CharField(max_length=150, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    profile_picture = models.CharField(max_length=1000, blank=True)
    user_role = models.IntegerField(default=0, 
                                    validators=[MaxValueValidator(4), 
                                                MinValueValidator(0)])
    external_auth = models.BooleanField()

class CourseUnit(models.Model):
    course_code = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    
    class Meta:
        verbose_name = 'Course Unit'
    
    def __str__(self):
        return f'{self.course_code}: {self.title}'
    
class Week(models.Model):
    title = models.CharField(max_length=400)
    description = models.TextField()
    course_unit = models.ForeignKey(CourseUnit, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.course_unit_id.course_code}: {self.title}'
    
class Video(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    link = models.CharField(max_length=1000)
    thumbnail = models.CharField(max_length=1000, blank=True)
    week = models.ForeignKey(Week, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.week_id.title}: {self.title}'
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    created_at = models.DateTimeField()
    active = models.BooleanField()
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey('self', null=True, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.fullname}({self.username}): {self.body}'
    
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Video Likes'
    
    def __str__(self):
        return f'{self.comment} liked by {self.user}'
    
class Dislike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Video Dislikes'
    
    def __str__(self):
        return f'{self.comment} disliked by {self.user}'