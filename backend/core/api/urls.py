from rest_framework.routers import DefaultRouter
from athena.api.urls import athena_router
from django.urls import path, include

router = DefaultRouter()
router.registry.extend(athena_router.registry)

urlpatterns = [
    path('', include(router.urls))
]
