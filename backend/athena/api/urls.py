from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

import logging

logger = logging.getLogger(__name__)

athena_router = DefaultRouter()
athena_router.register(r'users', UserViewSet)
athena_router.register(r'course_units', CourseUnitViewSet)
athena_router.register(r'weeks', WeekViewSet)
athena_router.register(r'videos', VideoViewSet)
athena_router.register(r'comments', CommentViewSet)


urlpatterns = [
    # path('weeks/<int:week_id>/videos', WeekViewSet.as_view({'get': 'videos'}), name='week-videos'),
    # path('course_units/<int:course_unit_id>/weeks', CourseUnitViewSet.as_view({'get': 'weeks'}), name='course-unit-weeks'),
    # path('videos/<int:video_id>/comments', VideoViewSet.as_view({'get': 'get_video_comments'}), name='video-comments'),
    # path('comments/<int:parent_comment_id>/replies', CommentViewSet.as_view({'get': 'get_comment_replies'}), name='comment-replies'),
]

logger.debug(urlpatterns)