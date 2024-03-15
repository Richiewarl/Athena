from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

athena_router = DefaultRouter()
athena_router.register(r'users', UserViewSet)
athena_router.register(r'course_units', CourseUnitViewSet)
athena_router.register(r'weeks', WeekViewSet)
athena_router.register(r'videos', VideoViewSet)
athena_router.register(r'comments', CommentViewSet)


urlpatterns = [
]