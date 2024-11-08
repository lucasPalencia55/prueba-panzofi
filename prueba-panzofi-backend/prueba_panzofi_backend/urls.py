from django.urls import path
from . import views

urlpatterns = [
    path('auth', views.login, name='login'),
    path('users/', views.get_users, name='get_users'),
    path('user/', views.get_user, name='get_user'),
    path('update-user', views.update_user, name='update_users'),
    path('aplication/', views.get_data_app, name='get_data_app'),
]