from django.db import models
from TodaySalary.users import models as user_models
from TodaySalary.images import models as image_models
from taggit.managers import TaggableManager

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

class Notification(TimeStampedModel):

    TYPE_CHOICES = (
        ('today', 'Today Complete'),
        ('month', 'Month Complete'),
        ('holi', 'Today Holiday')
    )

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, related_name='creator')
    # to = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True, related_name='to')
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    # image = models.ForeignKey(image_models.Image, on_delete=models.SET_NULL, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return 'From : {} - To : {}'.format(self.creator)
    