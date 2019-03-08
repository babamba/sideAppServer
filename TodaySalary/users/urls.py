from django.urls import path
from . import views

app_name = "users"

urlpatterns = [

    # 최신 글 5개 씩 보기
    path("explore/",   view=views.ExploreUsers.as_view(),  name="explore_users"),

    # 로그인 유저의 팔로워 리스트
    path("<username>/followers/", view=views.UserFollowers.as_view(), name="user_followers"),

    # 로그인 유저의 팔로잉 리스트
    path("<username>/following/", view=views.UserFollowing.as_view(), name="user_following"),

    # 로그인 유저 > 대상 팔로잉
    path("<int:user_id>/follow/", view=views.FollowUser.as_view(), name="follow_user"),

    # 로그인 유저 > 대상 팔로잉 취소
    path("<int:user_id>/unfollow/", view=views.UnFollowUser.as_view(), name="unfollow_user"),

    # 유저명으로 유저 검색
    path("search/", view=views.Search.as_view(), name="search"),

    # 대상유저 프로파일 
    path("<username>/", view=views.UserProfile.as_view(), name="user_profile"),

    # 비밀번호 변경
    path("<username>/password/", view=views.ChangePassword.as_view(), name="password"),

    path("login/facebook/", view=views.FacebookLogin.as_view(), name="fb_login"),
    
]
