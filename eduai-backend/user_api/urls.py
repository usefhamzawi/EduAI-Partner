from django.urls import path
from .views import UserRegister, UserLogin, UserLogout, UserView, classify, get_csrf_token\

urlpatterns = [
    path('register/', UserRegister.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
    path('user/', UserView.as_view(), name='user'),
    path('classify/', classify, name='classify'),
    path('api/csrf-token/', get_csrf_token),
]