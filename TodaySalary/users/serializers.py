from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from . import models
from TodaySalary.users import models as user_model
from TodaySalary.images import serializers as images_serializers

# 시러얼라이즈는 Json to Python 또는 Python to Json 형태를 유지시켜주기 위해 사용
# rest_framework에 내장된 기능
# 클래스를 지정해주고 각각에 해당하는 시리얼라이즈에 request.data를 인수로 실행하여 가공처리 

class ListUserSerializer(serializers.ModelSerializer):
         
    following = serializers.SerializerMethodField()

    class Meta:
        model = user_model.User
        fields = (
            'id',
            'profile_image',
            'username',
            'name',
            'bio',
            'website',
            'post_count',
            'followers_count',
            'following_count',
            'following'
        )
    
    def get_following(self, obj):
            if 'request' in self.context:
                request = self.context['request']

                if obj in request.user.following.all():
                    return True
                return False



class UserProfileSerializer(serializers.ModelSerializer):
    
    images = images_serializers.ImageSerializer(many=True, read_only=True)
    # ReadOnlyField 는 ㅎ당 필드들을 수정하지않는다.
    #post_count = serializers.ReadOnlyField()
    #followers_count = serializers.ReadOnlyField()
    #following_count = serializers.ReadOnlyField()
    #is_self = serializers.SerializerMethodField()
    #following = serializers.SerializerMethodField()

    class Meta:
        model = models.User
        fields = (
            'pk',
            'profile_image',
            'username',
            'name',
            'bio',
            #'website',
            #'post_count',
            #'followers_count',
            #'following_count',
            'images',
            #'is_self',
            #'following'
        )

    # def get_is_self(self, user):
    #     if 'request' in self.context:
    #         request = self.context['request']
    #         if user.id == request.user.id:
    #             return True
    #         else:
    #             return False
    #     return False

    # def get_following(self, obj):
    #     if 'request' in self.context:
    #         request = self.context['request']

    #         if obj in request.user.following.all():
    #             return True
    #     return False

class SignUpSerializer(RegisterSerializer):

    username = serializers.CharField(required=True, write_only=True)

    def get_cleaned_data(self):
        return {
             # 'name': self.validated_data.get('name', ''),
            'username': self.validated_data.get('username', ''),
            'password': self.validated_data.get('password', ''),
            'email': self.validated_data.get('email', '')
        }
    
    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.save()
        return user