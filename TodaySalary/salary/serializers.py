from rest_framework import serializers
from . import models
from TodaySalary.users import models as user_model

# 시러얼라이즈는 Json to Python 또는 Python to Json 형태를 유지시켜주기 위해 사용
# rest_framework에 내장된 기능
# 클래스를 지정해주고 각각에 해당하는 시리얼라이즈에 request.data를 인수로 실행하여 가공처리 
class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_model.User
        fields = (
            'id',
            'username',
        )


class EnrollCousumSerializer(serializers.ModelSerializer):
    
    # 필수가 아니어도 되도록 시리얼라이저에서 변경 가능한 방법
    # file = serializers.FileField(required=False)
    creator = UserProfileSerializer(read_only=True)

    class Meta:
        model = models.Income
        fields = (
            'income_name',
            'price',
            'feeling',
            'consumType',
            'creator',
        )
