from django.db import models
from TodaySalary.users import models as user_models
from taggit.managers import TaggableManager
from django.contrib.humanize.templatetags.humanize import naturaltime

# Create your models here.
# 디비 컬럼이라고 생각하면 됨. 스프링에서는 VO
# 요청 시 다른 User : {} - Image Caption :{} 식으로 표시 값 바꿔줄수 있음
# 컬럼을 추가할때 makemigrations 및 migrate 실행 해줘야 추가된 컬럼이 활성

class TimeStampedModel(models.Model):

    # 생성 및 업데이트 시 공통적으로 사용되는 타임스탬프 정보 추상

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Income(TimeStampedModel):

    # 수입 정보 ( 타임스탬프 클래스 상속 )
    income_name = models.CharField(max_length=140)                         # 등록 내용
    enrollId = models.AutoField(auto_created=True, primary_key=True)       # 등록 pk id
    price = models.IntegerField(default=0)                                 # 등록 금액
    feeling = models.CharField(max_length=1, null=True, default=0)         # 기분상태
    consumType = models.CharField(max_length=1, null=True, default=0)      # 0 : 수입 & 1 :지출 타입 
    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, null=True, related_name='salary')

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    class Meta:
        ordering = ['-created_at']


#class Income(TimeStampedModel):
