from rest_framework import serializers
from . import models
from TodaySalary.users import models as user_model
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)

# 시러얼라이즈는 Json to Python 또는 Python to Json 형태를 유지시켜주기 위해 사용
# rest_framework에 내장된 기능
# 클래스를 지정해주고 각각에 해당하는 시리얼라이즈에 request.data를 인수로 실행하여 가공처리 

class SmallImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = (
            'file',
        )

class FeedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_model.User
        fields = (
            'profile_image',
            'username',
            'name',
            'bio',
            'website',
            'post_count',
            'followers_count',
            'following_count',
        )

class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.Comment
        fields = (
                    'id',
                    'message',
                    'creator'
                )
    

class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Like
        fields = '__all__'

class InputImageSerializer(serializers.ModelSerializer):
    
    # 필수가 아니어도 되도록 시리얼라이저에서 변경 가능한 방법
    # file = serializers.FileField(required=False)
    tags = TagListSerializerField()

    class Meta:
        model = models.Image
        fields = (
            'file',
            'location',
            'caption',
            'tags'
        )

class ImageSerializer(TaggitSerializer, serializers.ModelSerializer):

    comments = CommentSerializer(many=True)
    creator = FeedUserSerializer()
    tags = TagListSerializerField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = models.Image
        fields = (
                    'id',
                    'file',
                    'location',
                    'caption',
                    'comments',
                    'like_count',
                    'creator',
                    'natural_time',
                    'tags',
                    'is_liked',
                    'is_vertical'
                )


    def get_is_liked(self, obj):
            if 'request' in self.context:
                request = self.context['request']
                try:
                    models.Like.objects.get(creator__id=request.user.id, image__id=obj.id)
                    return True
                except models.Like.DoesNotExist:
                    return False
            return False

class CountImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'like_count',
            'comment_count'
        )