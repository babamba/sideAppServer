# Generated by Django 2.0.9 on 2019-03-15 00:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('salary', '0009_auto_20190315_0938'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='salarydata',
            name='standardMonth',
        ),
    ]
