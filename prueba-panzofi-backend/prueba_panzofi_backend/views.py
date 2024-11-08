from django.http import JsonResponse
from .models import User
from django.http import JsonResponse
from .models import User, Admin, Aplication
from django.db.models import F
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_users(request):
    users = User.objects.all().values()
    return JsonResponse(list(users), safe=False)

@csrf_exempt
def get_user(request):
    user = User.objects.get(id=request.POST.get('id'))
    return JsonResponse({"user": {"id" : user.id, "name": user.name, "role": user.role, "count1": user.button1_count, "count2": user.button2_count }}, status=200)

@csrf_exempt
def update_user(request):
    User.objects.filter(id=request.POST.get('id')).update(
        time=request.POST.get('time'),
        button1_count=request.POST.get('count1'),
        button2_count=request.POST.get('count2'),
    )
    return JsonResponse({"message": "Login successful", "status": 200}, status=200)

@csrf_exempt
def get_data_app(request):
    app = Aplication.objects.get()
    return JsonResponse({"data": {"name": app.name, "description": app.description, "url_image": app.url_image }}, status=200)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        username = request.POST.get('user_name')
        password = request.POST.get('password')
        try:
            user = User.objects.get(user_name=username)
            if check_password(password, user.password): 
                return JsonResponse({"message": "Login successful", "user": {"id" : user.id, "name": user.name, "role": user.role, "count1": user.button1_count, "count2": user.button2_count, "time": user.time }}, status=200)
            else:
                return JsonResponse({"message": "Incorrect password"}, status=400)
        except User.DoesNotExist:

            try:
                admin = Admin.objects.get(user_name=username)
                if check_password(password, admin.password): 
                    return JsonResponse({"message": "Login successful", "user": {"id" : admin.id, "name": admin.name, "role": admin.role}}, status=200)
                else:
                    return JsonResponse({"message": "Incorrect password"}, status=400)
            except Admin.DoesNotExist:
                return JsonResponse({"message": "User not found"}, status=404)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)