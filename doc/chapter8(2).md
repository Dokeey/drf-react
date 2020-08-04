# DRF-React Study

## Chapter 8. 장고 DRF를 활용한 웹 API 만들기

### mixins 상속을 통한 APIView

- DRF에서 지원하는 mixins
  - CreateModelMixin
  - ListModelMixin
  - RetrieveModelMixin
  - UpdateModelMixin
  - DestroyModelMixin
-   다양한 View의 구현 방법
  - 중복을 줄이기
  - 상황에 맞춰 다양한 방법으로 View를 구현
  - 생산성 극대화

### ViewSet과 Router

- 단일 리소스에서 관련있는 View들을 단일 클래스에서 제공

  - 2개의 URL이 필요

- Post 리소스에 대한 2개의 URL

- ModelViewSet

  - viewsets.ReadOnlyModelViewSet
    - list 지원 : 1개의 URL
    - detail 지원 : 1개의 URL
  - viewsets.ModelViewSet
    - list/create 지원 : 1개의 URL
    - detail/update/partial_update/delete 지원 : 1개의 URL

- URL patterns에 매핑하기

  - 개별 VIew를 만들수도 있고

    - ```python
      post_list = PostViewSet.as_view({'get': 'list'})
      post_detail = PostViewSet.as_view({'get': 'retrieve'})
      ```

  - Router를 통해 일괄적으로 등록

    -  ```python
      from rest_framework.routers import DefaultRouter
      router = DefaultRouter()
      router.register('post', views.PostViewSet)
      
      urlpatterns = [
        path('', include(router.urls)),
      ]
      ```

    - 실제로 2개의 URL뿐 아니라 URL별 포맷(json, api 등) url도 구현되어 있음

- ViewSet에 새로운 EndPoint 추가하기

  - action 장식자 활용

  - ```python
    from rest_framework.decorators import action
    
    # detail이 아닌 URL(list URL) get 메소드 접근시
    @action(detail=False, methods=['GET'])
    def public(self, request):
      qs = self.queryset.filter(is_public=True)
      serializer = self.get_serializer(qs, many=True)
      return Reponse(serializer.data)
    
    # detail URL에 대해 patch 메소드 접근시
    @action(detail=True, methods=['PATCH'])
    def set_public(self, request, pk):
      instance = self.get_object()
      instance.is_public = True
      instance.save()
      serializer = self.get_serializer(instance)
      return Response(serializer.data)
    ```

  - URL Reverse 명 : basename-함수명

  
