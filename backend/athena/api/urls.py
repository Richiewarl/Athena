from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CourseUnitViewSet, WeekViewSet, VideoViewSet, CommentViewSet

course_unit_router = DefaultRouter()
course_unit_router.register(r'course_units', CourseUnitViewSet)
course_unit_router.register(r'weeks', WeekViewSet)
course_unit_router.register(r'videos', VideoViewSet)
course_unit_router.register(r'comments', CommentViewSet)


urlpatterns = [
    path('weeks/<int:week_id>/videos', VideoViewSet.as_view({'get': 'videos'}), name='week-videos'),
    path('course_units/<int:course_unit_id>/weeks', WeekViewSet.as_view({'get': 'weeks'}), name='course-unit-weeks'),
    path('video/<int:video_id>/root_level_comments', CommentViewSet.as_view({'get': 'root_level_comments'}), name='root-level-comments'),
    path('comment/<int:parent_comment_id>/replies', CommentViewSet.as_view({'get': 'replies'}), name='comment-replies')
]
