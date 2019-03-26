from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
import time
import requests
import json
from TodaySalary.notifications import views as notification_views

# class 기반 뷰 - http request 를 위한 모든 method 를 class 안에 넣음
class Notifications(APIView):
    def get(self, request, format=None):
        user = request.user

        Notifications = models.Notification.objects.filter(to= user)

        #serializer = serializers.NotificationSerializer(Notifications, many=True) 
        serializer = serializers.NotificationSerializer(
            Notifications, many=True, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class TodayNotifications(APIView):
        def post(self, request, format=None):
            user = request.user
            notification_views.create_notification(user, 'today', '오늘도 고생했어요!')
            return Response(status=status.HTTP_201_CREATED)

class MonthNotifications(APIView):
        def post(self, request, format=None):
            user = request.user
            notification_views.create_notification(user, 'month', '이번달도 고생했어요!')
            return Response(status=status.HTTP_201_CREATED)

class HolidayNotifications(APIView):
        def post(self, request, format=None):
            user = request.user
            notification_views.create_notification(user, 'holi', '쉬는날이네요! 푹 쉬어요!')
            return Response(status=status.HTTP_201_CREATED)

# 함수 형 뷰를 제작함으로써 다른 뷰에서 ex)나를 팔로우/잉 하거나 댓글을 달거나 좋아요를 눌렀을떄
# 해당 뷰에 알림 views 를 임포틓고 해당 함수를 통해 저장함으로써 알림내용 알리거나 목록을 볼 수 있음
def create_notification(creator, notification_type, comment ):

    # print(creator, to , notification_type, image, comment)

    # notification = models.Notification.objects.create(
    #     creator=creator,
    #     to=to,
    #     image=image,
    #     notification_type=notification_type,
    #     comment=comment
    # )

    print(creator , notification_type, comment)

    notification = models.Notification.objects.create(
        creator=creator,
        notification_type=notification_type,
        comment=comment
    )

    # time.sleep(10)

    # notification.save()

    # action = ''

    # if notification_type == 'like':

    #     action = 'liked your photo'
    
    # elif notification_type == 'comment':

    #     action = 'commented on your photo'
    
    # elif notification_type == 'follow':

    #     action = 'followed you'
        

    # url = "https://exp.host/--/api/v2/push/send"
    # data = {
    #     "to": creator.push_token,
    #     "sound": "default",
    #     "body": f'Somebody {action}',
    #     "badge": 1
    # }
    # headers = {'Content-type': 'application/json',
    #            'Accept': 'application/json', 'Accept-Encoding': 'gzip, deflate'}

    # request = requests.post(url, data=json.dumps(data), headers=headers)

    # print(request.json())

