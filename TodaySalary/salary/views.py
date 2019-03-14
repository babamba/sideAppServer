from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from TodaySalary.users import serializers as user_serializers
from TodaySalary.notifications import views as notification_views
from TodaySalary.users import models as user_model
from datetime import date, datetime, time

# Create your views here.
# 소비관련 CRUD

class SalaryData(APIView):
     
     # 소비 등록 
     def post(self, request, format=None):
          user = request.user

          serializer = serializers.UserSalarySerializer(data=request.data)

          if serializer.is_valid():
               saveData = serializer.save(creator=user)
               # serializer.created_at = saveData.created_at
               # serializer.enrollId = saveData.enrollId
               # print(saveData.enrollId)
               # print(serializer.enrollId)
               print(saveData)
               return Response(data=serializer.data ,status = status.HTTP_201_CREATED)
          else:
               return Response(data=serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class Consum(APIView):

     # 소비 등록 
     def post(self, request, format=None):
          user = request.user

          serializer = serializers.EnrollCousumSerializer(data=request.data)

          if serializer.is_valid():
               saveData = serializer.save(creator=user)
               serializer.created_at = saveData.created_at
               serializer.enrollId = saveData.enrollId
               print(saveData.enrollId)
               print(serializer.enrollId)
               print(serializer.data)
               return Response(data=serializer.data ,status = status.HTTP_201_CREATED)
          else:
               return Response(data=serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# 특정날짜 오늘 하루 수입지출 내역정보 리턴
class TodayData(APIView):

     def get(self, request, date, type, format=None):
          
          user = request.user
          userObject = user_model.User.objects.get(username=user)

          #print(userObject.id)
          #print(date)
          #print(standard_month)
          #print(salary_day)

          convert_date = datetime.strptime(date, "%Y%m%d").date()

          year = convert_date.year
          month = convert_date.month
          day = convert_date.day

          today = datetime(year, month , day)
          tommorrow = datetime(year, month, day + 1)

          today_data = models.Income.objects.filter( 
                                              created_at__range=[today, tommorrow],
                                              creator_id=userObject.id,
                                              consumType=type
                                              
                                              #created_at__lte=today,
                                              #created_at__month=today.month,
                                                  #  created_at__day=today.day,
                                              #creator_id=userObject.id)
          
          # month_data = models.Income.objects.filter(creator_id=userObject.id,
          #                                         created_at__range=[start_date, end_date]
                                                   )
          print("today", today)
          print("tommorrow", tommorrow)
          print("today_data", today_data)

          print("userObject", userObject.id)
          print("convert_date", convert_date.year)
          print("convert_date", convert_date.month)
          print("convert_date", convert_date.day)
          # # Incomes = models.Income.objects.filter(creator_id=userObject.id)
          today_serializer = serializers.EnrollCousumSerializer(
               today_data, many=True, context={'request': request})

          # month_serializer = serializers.EnrollCousumSerializer(
          #      month_data, many=True, context={'request': request})


          #data = [today_serializer, month_serializer]

          # print(serializer)

          return Response(data=today_serializer.data ,status = status.HTTP_200_OK)


     # def get(self, request, format=None):
     #     user = request.user

     #     image_list = []


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


# 기준 달 수입지출 내역정보 리턴
class MonthData(APIView):

     def get(self, request, date, standard_month, salary_day, type, format=None):
          user = request.user
          userObject = user_model.User.objects.get(username=user)
          convert_date = datetime.strptime(date, "%Y%m%d").date()

          print(standard_month - 1)
          print(standard_month)
          print(salary_day)

          start_date = datetime(convert_date.year, ( standard_month - 1) , salary_day)
          end_date = datetime(convert_date.year, standard_month, ( salary_day + 1))

          #월급 날짜 21짜 부터 다음달 21일자 (+1) 까지 

          #print(convert_date)
          print(start_date)
          print(end_date)

          # today_data = models.Income.objects.filter(creator_id=userObject.id, 
          #                                     created_at__gte=convert_date)
          
          month_data = models.Income.objects.filter(creator_id=userObject.id,
                                                  created_at__range=[start_date, end_date],
                                                  consumType=type
                                                  )

          month_serializer = serializers.EnrollCousumSerializer(
               month_data, many=True, context={'request': request})


          #data = [today_serializer, month_serializer]

          # print(serializer)

          return Response(data=month_serializer.data ,status = status.HTTP_200_OK)