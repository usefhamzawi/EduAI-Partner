from django.urls import path
from .views import UserRegister, UserLogin, UserLogout, UserView, classify, get_csrf_token, get_chat_history, save_message, save_chat, rename_chat, delete_chat

urlpatterns = [
    path('register/', UserRegister.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
    path('user/', UserView.as_view(), name='user'),
    path('classify/', classify, name='classify'),
    path('chat_history/', get_chat_history, name='chat_history'),
    path('save_message/', save_message, name='save_message'),
    path('save_chat/', save_chat, name='save_chat'),
    path('rename_chat/', rename_chat, name='rename_chat'),
    path('delete_chat/', delete_chat, name='delete_chat'),
    path('api/csrf-token/', get_csrf_token),
]
