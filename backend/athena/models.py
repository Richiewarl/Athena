from django.db import models

class CourseUnit(models.Model):
    course_code = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    description = models.TextField()
    
    class Meta:
        verbose_name = 'Course Unit'
    
    def __str__(self):
        return f'{self.course_code}: {self.title}'
    
class Week(models.Model):
    title = models.CharField(max_length=200)
    course_unit_id = models.ForeignKey(CourseUnit, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.course_unit_id.course_code}: {self.title}'
    
class Video(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    uploaded_at = models.DateTimeField()
    link = models.CharField(max_length=500)
    week_id = models.ForeignKey(Week, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.week_id.title}: {self.title}'