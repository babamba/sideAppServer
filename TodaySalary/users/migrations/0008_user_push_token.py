# Generated by Django 2.0.9 on 2019-03-26 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_auto_20190311_1641'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='push_token',
            field=models.TextField(default=''),
        ),
    ]
