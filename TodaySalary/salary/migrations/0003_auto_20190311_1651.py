# Generated by Django 2.0.9 on 2019-03-11 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('salary', '0002_auto_20190311_1641'),
    ]

    operations = [
        migrations.AddField(
            model_name='income',
            name='feeling',
            field=models.CharField(max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='income',
            name='price',
            field=models.IntegerField(default=0),
        ),
    ]
