from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    user_name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    date = models.DateField()
    time = models.BigIntegerField(default=0)
    button1_count = models.IntegerField()
    button2_count = models.IntegerField()
    role = models.CharField(max_length=30)

class Admin(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    user_name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=30)

class Aplication(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    url_image = models.CharField(max_length=1000)