from rest_framework.routers import DefaultRouter
from athena.api.urls import course_unit_router
from django.urls import path, include

router = DefaultRouter()

router.registry.extend(course_unit_router.registry)

urlpatterns = [
    path('', include(router.urls))
]
