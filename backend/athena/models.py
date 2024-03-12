from django.db import models

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
    course_unit_id = models.ForeignKey(CourseUnit, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.course_unit_id.course_code}: {self.title}'
    
class Video(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    uploaded_at = models.DateTimeField()
    link = models.CharField(max_length=1000)
    thumbnail = models.CharField(max_length=1000, blank=True)
    week_id = models.ForeignKey(Week, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.week_id.title}: {self.title}'
    
class Comment(models.Model):
    fullname = models.CharField(max_length=300)
    username = models.CharField(max_length=150)
    # user_role = models.IntegerField()
    body = models.TextField()
    created_at = models.DateTimeField()
    active = models.BooleanField()
    like = models.IntegerField()
    dislike = models.IntegerField()
    video_id = models.ForeignKey(Video, on_delete=models.CASCADE)
    parent_comment_id = models.ForeignKey('self', null=True, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.fullname}({self.username}): {self.body}'