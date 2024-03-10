from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CourseUnitViewSet, WeekViewSet, VideoViewSet, CommentViewSet

import logging

logger = logging.getLogger(__name__)

course_unit_router = DefaultRouter()
course_unit_router.register(r'course_units', CourseUnitViewSet)
course_unit_router.register(r'weeks', WeekViewSet)
course_unit_router.register(r'videos', VideoViewSet)
course_unit_router.register(r'comments', CommentViewSet)


urlpatterns = [
    path('weeks/<int:week_id>/videos', WeekViewSet.as_view({'get': 'videos'}), name='week-videos'),
    path('course_units/<int:course_unit_id>/weeks', CourseUnitViewSet.as_view({'get': 'weeks'}), name='course-unit-weeks'),
    path('videos/<int:video_id>/comments', VideoViewSet.as_view({'get': 'get_video_comments'}), name='video-comments'),
    path('comments/<int:parent_comment_id>/replies', CommentViewSet.as_view({'get': 'get_comment_replies'}), name='comment-replies'),
]

logger.debug(urlpatterns)