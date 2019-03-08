from django.urls import path
from . import views

app_name = "notifications"

urlpatterns = [

    # 최근 좋아요 / 코멘트 / 팔로잉 알림 
    path("", view=views.Notifications.as_view(), name="notifications"),
]
