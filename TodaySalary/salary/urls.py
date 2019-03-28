from django.urls import path
from . import views

app_name = "salary"

urlpatterns = [

    # 최근 좋아요 / 코멘트 / 팔로잉 알림 
    path("salary_data/", view=views.SalaryData.as_view(), name="salary_data"),

    path("consum/", view=views.Consum.as_view(), name="consum_data"),

    path("<str:date>/<int:type>/today_data/", view=views.TodayData.as_view(), name="get_save_data"),

    path("<str:date>/today_report_data/", view=views.TodayReportData.as_view(), name="today_report_data"),

    path("<str:date>/<int:standard_month>/<int:salary_day>/month_report_data/", view=views.MonthReportData.as_view(), name="month_report_data"),

    path("<str:date>/<int:standard_month>/<int:salary_day>/<int:type>/month_data/", view=views.MonthData.as_view(), name="get_save_data"),

    path("<str:date>/<int:type>/all_data/", view=views.AllData.as_view(), name="get_all_data"),

     path("fix_consum_data/", view=views.FixConsum.as_view(), name="fix_consum_data"),
]
