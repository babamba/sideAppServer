from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
import time
import requests
import json

# class 기반 뷰 - http request 를 위한 모든 method 를 class 안에 넣음
class Notifications(APIView):
    def get(self, request, format=None):
        user = request.user

        Notifications = models.Notification.objects.filter(to= user)

        #serializer = serializers.NotificationSerializer(Notifications, many=True) 
        serializer = serializers.NotificationSerializer(
            Notifications, many=True, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)


# 함수 형 뷰를 제작함으로써 다른 뷰에서 ex)나를 팔로우/잉 하거나 댓글을 달거나 좋아요를 눌렀을떄
# 해당 뷰에 알림 views 를 임포틓고 해당 함수를 통해 저장함으로써 알림내용 알리거나 목록을 볼 수 있음
def create_notification(creator, to , notification_type, image = None, comment = None ):

    print(creator, to , notification_type, image, comment)

    notification = models.Notification.objects.create(
        creator=creator,
        to=to,
        image=image,
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

