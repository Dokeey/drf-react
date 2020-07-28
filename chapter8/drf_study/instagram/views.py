from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .serializers import PostSerializer
from .models import Post


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


# class PostListAPIView(generics.ListAPIView):
#     queryset = Post.objects.filter(is_public=True)
#     serializer_class = PostSerializer
#
#
# post_list = PostListAPIView.as_view()


# class PostListAPIView(APIView):
#     def get(self, request):
#         qs = Post.objects.filter(is_public=True)
#         serializer = PostSerializer(qs, many=True)
#         return Response(serializer.data)
#
#
# post_list = PostListAPIView.as_view()

@api_view(['GET'])
def post_list(request):
    qs = Post.objects.filter(is_public=True)
    serializer = PostSerializer(qs, many=True)
    return Response(serializer.data)



# def dispatch(self, request, *args, **kwargs):
#     # django logger 추천. print 비추천
#     print("request body", request.body)
#     print("request POST", request.POST)
#     return super().dispatch(request, *args, **kwargs)
