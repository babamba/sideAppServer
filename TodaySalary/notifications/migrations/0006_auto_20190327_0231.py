# Generated by Django 2.0.9 on 2019-03-26 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0005_auto_20181018_1731'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='notification_type',
            field=models.CharField(choices=[('today', 'Today Complete'), ('month', 'Month Complete'), ('holi', 'Today Holiday')], max_length=20),
        ),
    ]
