from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from TodaySalary.users import serializers as user_serializers
from TodaySalary.notifications import views as notification_views
from TodaySalary.users import models as user_model

# Create your views here.
# 소비관련 CRUD
class Consum(APIView):

     # 소비 등록 
     def post(self, request, format=None):
          # print(request.user)
          
          user = request.user

          serializer = serializers.EnrollCousumSerializer(data=request.data)

          if serializer.is_valid():
               serializer.save(creator=user)
               return Response(data=serializer.data, status = status.HTTP_201_CREATED)
          else:
               return Response(data=serializer.errors, status = status.HTTP_400_BAD_REQUEST)


     #def get(self, request, format=None):

          #user = request.user

          # following_users = user.following.all()

          # image_list = []

          #for following_user in following_users:

          #     user_images = following_user.images.all()[:2]

          #     for image in user_images:
          #          image_list.append(image)

          #my_images = user.images.all()[:2]

          #for image in my_images:
          #     image_list.append(image)

          #sorted_list = sorted(
          #     image_list, key=lambda image : image.created_at, reverse=True)
          
          # serializer = serializers.ImageSerializer(
          #      sorted_list, many=True, context={'request':request})

          # return Response(serializer.data)



        