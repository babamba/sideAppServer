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


class Image(TimeStampedModel):

    # 이미지 모델 ( 타임스탬프 클래스 상속 )
    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, null=True, related_name='images')
    tags = TaggableManager()

    @property
    def like_count(self):
        return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    @property
    def is_vertical(self):
        if self.file.width < self.file.height:
            return True
        else:
            return False

    def  __str__(self):
        return '{} - {}'.format(self.location, self.caption)

    class Meta:
        ordering = ['-created_at']


class Comment(TimeStampedModel):

    # 댓글 모델 ( 타임스탬프 클래스 상속 )

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, null=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, related_name='comments')

    def  __str__(self):
        return self.message

class Like(TimeStampedModel):

    # 좋아요 ( relationship) 모델 ( 타임스탬프 클래스 상속 )

    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, null=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, related_name='likes')

    def  __str__(self):
        return 'User : {} - Image Caption :{}'.format(self.creator.username, self.image.caption)