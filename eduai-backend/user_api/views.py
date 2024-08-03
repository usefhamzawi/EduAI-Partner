from django.contrib.auth import login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from .validations import custom_validation, validate_email, validate_password
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import logging
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .language_model import answer_question
from .models import ChatMessage, Chat
from .serializers import ChatMessageSerializer
from django.shortcuts import get_object_or_404

logger = logging.getLogger(__name__)

class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)
	

@csrf_exempt
@api_view(['POST'])
def classify(request):
    user = request.user
    question = request.data.get('question')
    logger.info(f"Received question: {question}")

    try:
        answer = answer_question(question)
        logger.info(f"Generated answer: {answer}")

        # You might need to get or create a Chat instance here
        chat, _ = Chat.objects.get_or_create(name='Default Chat', user=user)
        chat_message = ChatMessage.objects.create(
            chat=chat,
            message=answer,
            type='bot'
        )
        logger.info(f"Chat Message Saved: {chat_message}")

        return Response({"answer": answer})
    except Exception as e:
        logger.error(f"Error answering question: {e}")
        return Response({"error": "An error occurred while processing your question. Please try again."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_chat_history(request):
    user = request.user
    chats = ChatMessage.objects.filter(chat__user=user).values('chat__name', 'message', 'type')
    return Response(chats)


@api_view(['POST'])
def save_message(request):
    chat_name = request.data.get('chat_name')
    message = request.data.get('message')
    message_type = request.data.get('type')
    user = request.user

    chat, created = Chat.objects.get_or_create(name=chat_name, user=user)
    ChatMessage.objects.create(chat=chat, message=message, type=message_type)
    return Response({"status": "Message saved"})


@csrf_exempt
def save_chat(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            chat_name = data.get('chat_name')
            chat_content = data.get('chat_content')

            if not chat_name or not chat_content:
                return JsonResponse({'error': 'Invalid data'}, status=400)

            # Handle saving logic here
            chat = Chat(name=chat_name, content=chat_content)
            chat.save()

            return JsonResponse({'message': 'Chat saved successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)

@csrf_exempt
def rename_chat(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            old_name = data.get('old_name')
            new_name = data.get('new_name')

            if not old_name or not new_name:
                return JsonResponse({'error': 'Invalid data'}, status=400)

            try:
                chat = Chat.objects.get(name=old_name)
                chat.name = new_name
                chat.save()
                return JsonResponse({'message': 'Chat renamed successfully'})
            except Chat.DoesNotExist:
                return JsonResponse({'error': 'Chat does not exist'}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)
    
	
@api_view(['POST'])
def delete_chat(request):
    chat_name = request.data.get('chat_name')
    user = request.user

    chat = get_object_or_404(Chat, name=chat_name, user=user)
    chat.delete()
    
    return JsonResponse({'status': 'Chat deleted successfully.'})

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'detail': 'CSRF cookie set'})