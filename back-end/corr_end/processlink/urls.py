from django.conf.urls import url

from .views import (getLink, postLink)

urlpatterns = [
    url(r'^sendlink', getLink),
    url(r'^pushlink', postLink),
]