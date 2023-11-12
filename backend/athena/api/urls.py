from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CourseUnitViewSet, WeekViewSet, VideoViewSet

course_unit_router = DefaultRouter()
course_unit_router.register(r'course_units', CourseUnitViewSet)
course_unit_router.register(r'weeks', WeekViewSet)
course_unit_router.register(r'videos', VideoViewSet)


urlpatterns = [
    path('weeks/<int:week_id>/videos', VideoViewSet.as_view({'get': 'vdeos'}), name='week-videos'),
    path('course_units/<int:course_unit_id>/weeks', WeekViewSet.as_view({'get': 'vdeos'}), name='course-unit-weeks'),
]
