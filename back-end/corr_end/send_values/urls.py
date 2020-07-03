from .api.send_values_api import DinoViewSet, CorrelationsViewSet, ResearcherViewSet, LinksViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'dinos', DinoViewSet)
router.register(r'correlations', CorrelationsViewSet)
router.register(r'researchers', ResearcherViewSet)
router.register(r'links', LinksViewSet)
urlpatterns = router.urls