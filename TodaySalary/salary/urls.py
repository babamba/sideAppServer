from django.urls import path
from . import views

app_name = "salary"

urlpatterns = [

    # 최근 좋아요 / 코멘트 / 팔로잉 알림 
    path("consum/", view=views.Consum.as_view(), name="consum_data"),
]
