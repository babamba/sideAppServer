# Generated by Django 2.0.9 on 2019-03-14 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('salary', '0005_auto_20190311_1740'),
    ]

    operations = [
        migrations.CreateModel(
            name='SalaryData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.AlterField(
            model_name='income',
            name='consumType',
            field=models.CharField(default=0, max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='income',
            name='feeling',
            field=models.CharField(default=0, max_length=1, null=True),
        ),
    ]