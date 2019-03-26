from django.urls import path
from . import views

app_name = "notifications"

urlpatterns = [

    # 최근 좋아요 / 코멘트 / 팔로잉 알림 
    path("", view=views.Notifications.as_view(), name="notifications"),

    path("today", view=views.TodayNotifications.as_view(), name="today_notifications"),

    path("month", view=views.MonthNotifications.as_view(), name="month_notifications"),

    path("holi", view=views.HolidayNotifications.as_view(), name="holi_notifications"),
]
