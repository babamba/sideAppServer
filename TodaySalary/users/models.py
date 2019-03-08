from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _

# 디비 컬럼이라고 생각하면 됨. 스프링에서는 VO
# 컬럼을 추가할때 makemigrations 및 migrate 실행 해줘야 추가된 컬럼이 활성


class User(AbstractUser):

    # User Model

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('not-specified', 'Not specified')
    )

    # First Name and Last Name do not cover name patterns
    # around the globe.
    profile_image = models.ImageField(null=True)
    name = models.CharField(_("Name of User"), blank=True, max_length=255)
    website = models.URLField(null=True)
    bio = models.TextField(null=True)
    phone = models.CharField(max_length=140, null=True)
    gender = models.CharField(max_length=80, choices=GENDER_CHOICES, null=True)

    # A가 B를 팔로잉을 하면 B의 팔로워가 되어야 
    # 하는데 B의 프로필을 보면 같은 팔로잉이 되어있는 상황  symmetrical=False,  related_name="user"
    # 이와같이 해결해야하는 것 같음. 
    
    followers = models.ManyToManyField("self", symmetrical=False, related_name="user_followers")
    following = models.ManyToManyField("self", blank=True, symmetrical=False, related_name="user_following")

    def __str__(self):
             return self.username

    @property
    def post_count(self):
        return self.images.all().count()

    @property
    def followers_count(self):
        return self.followers.all().count()
    
    @property
    def following_count(self):
        return self.following.all().count()
