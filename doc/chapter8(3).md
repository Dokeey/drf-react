# DRF-React Study

## Chapter 8. 장고 DRF를 활용한 웹 API 만들기

### Renderer를 통한 다양한 응답 포맷 지원

- Renderer

  - 같은 Endpoint에서 요청받은 타입에 맞춰, 다양한 응답 포맷을 지원
  - Content-Type, URL의 방법을 통해 Renderer 지정 가능

- 기본 지원 Renderer

  - JSONRenderer : json.dumps를 통한 JSON 직렬화
    - 디폴트
    - media_type : application/json
    - format : json
  - BrowsableAPIRenderer : self-document HTML 렌더링
    - 디폴트
    - media_type : text/html
    - format : api
  - TemplateHTMLRenderer : 지정 템플릿을 통한 렌더링
    - media_type : text/html
    - format : api
    - Response에서 template_name 인자 지정 필요
    - API서버라고 해서 모든 응답을 JSON으로 받지 않아도 경우에 따라서 HTML 응답을 받을 수도 있음.

- 써드파티 Renderer

  - drf-rendere-xlsx
  - djangorestframework-yaml
  - djangorestframework-xml
  - djangorestframework-jsonp
  - djangorestframework-msgpack
  - djangorestframework-csv
  - rest-framework-latex

- Renderer 클래스 리스트 지정하기

  - 전역지정
    - settings > REST_FRAMEWORK > DEFAULT_RENDERER_CLASSES 리스트에 문자열로 지정
  - APIView 마다 지정
    - renderer_class 리스트
  - @api_view 마다 지정
    - renderer_classes 장식자

- @api_vew에서의 format 인자

  - ```python
    from rest_framework.urlpatterns import format_suffix_patterns
    
    # 함수 기반뷰에서 format 인자를 추가하는 URL을 만들고 싶다면
    urlpatterns = format_suffix_patterns([
      path('hello/', views.hello)
    ])
    ```

  - view를 생성할때 format=None 을 추가하도록 하자

- HTTPie 통한 format 지정

  - http :8000/ Accept:application/json
  - http :8000?format=json
  - http :8000.json



### Form과 Serializer에서 DRF 비교

- Serializer / ModelSerializer
  - 데이터 변환/직렬화 지원
  - Form/ModelForm과 유사
    - 뷰 응답을 생성하는데에 범용적이고 강력한 방법을 제공
- 주된 호출 주제
  - Form
    - 일반적으로 웹브라우저 상에서
  - Serializer
    - 다양한 Client에 대한 Data 위주의 http(s) 요청
- 유효성 검사 수행 시점
  - form.is_valid() 유효성 검사 수행시 True면 form_valid 호출, 아니면 form_invalid 호출
  - serializer.is_valid(raise_exception=True) 유효성 검사 수행시 실패하면 예외발생



### Serializer를 통한 유효성 검사 및 저장

- data 인자가 주어지면

  - .is_valid()가 호출되고 나서야
    - .initial_data 필드에 접근할 수 있고
    - .validated_data 를 통해 유효성 검증에 통과한 값들이 .save()시에 사용됨
    - .errors : 유효성 검증 수행 후에 오류 내역
    - .data : 유효성 검증 후, 갱신된 인스턴스에 대한 필드값 사전

- Serializer에의 유효성 검사

  - ```python
    class PostSerializer(serializer.Serializer):
    	...
      
      def validate_title(self, value):
        if 'django' not in value:
          raise ValidationError('제목에 djago를 포함하세요')
        return value
      	
      def validate(self, data):
        if 'django' not in data['title']:
          raise ValidationError('제목에 djago를 포함하세요')
        return data
    ```

- DB로의 반영과 Mixins의 perform_ 계열 함수

  - 실질적인 DB처리 로직은 perform_create, update, destroy를 통해 이뤄짐



### Authentication과 Permission

- 인증

  - 유입되는 요청을 허용/거부하는 것이 아니라
  - 단순히 인증정보로 유저를 식별하는 것
    - Authentication : 유저 식별
    - Permissions : 각 요청에 대한 허용/거부
    - Throttling : 일정 기간 동안에 허용할 최대 요청 횟수

- 인증 처리 순서

  - 매 요청 시마다 APIView의 dispatch(request) 호출
  - APIView의 initial(request) 호출
  - APIView의 perform_authentication(request) 호출
  - reqeust의 user 속성 호출 (rest_framwork.request.Request 타입)
  - request의 _authenticate() 호출

- 지원하는 인증의 종류

  - Session

    - 세션을 통한 인증, APIView에서 디폴트 지정

  - Basic

    - Basic 인증 헤더를 통한 인증

    - HTTPie를 통한 요청

      - ```bash
        http --auth 유저명:암호 --form POST :8000 필드명1:값 필드명2:값
        ```

  - Token

    - Toekn 헤더를 통한 인증
      - Authorization : Token 401f7a~~

  - RemoteUser

    - User가 다른 서비스에서 관리될 때, Remote 인증
    - Remote-User 헤더를 통한 인증 수행

- 웹브라우저를 통한 API 접근에서 로그인/로그아웃 지원

- 인증과 허가

  - 개체(정보/코드 등)에 대한 접근을 허용하기 위해서, 인증/식별만으로는 충분하지 않음
  - 추가로 각 개체에 대한 허가가 필요

- DRF의 Permission 시스템

  > 현재 요청에 대한 허용/거부를 결정. APIView 단위로 지정할 수 있음

  - AllowAny(디폴트 전역설정)
  - IsAuthenticated 
    - 인증된 요청 한에서 뷰 호출 허용
  - IsAdminUser 
    - staff 인증 요청 한에서 뷰 호출 허용
  - IsAuthenticatedOrReadOnly 
    - 비인증 요청에게는 읽기 권한만 허용
  - DjangoModelPermissions
    -  인증된 요청에 한해 뷰 호출을 허용하고, 추가로 장고의 모델단위 Permission 체크
  - DjangoModelPermissionsOrAnonReadOnly
    - DjangoModelPermissions과 유사하나, 비인증 요청에게는 읽기만 허용
  - DjangoObjectPermissions
    - 비인증 요청은 거부하고, 인증된 요청은 Object에 대한 권한 체크를 수행

- permission_class 지정

  - CBV
    - 멤버함수 permission_classes = [IsAutenticated]
  - FBV
    - permission_classes 장식자 사용

- 커스텀 Permission

  - 모든 Permission 클래스는 다음 2가지 함수를 선택적으로 구현
    - has_permission(request, view)
      - APIView 접근시 체크
      - 거의 모든 Permission 클래스에서 구현하며, 로직에 따라 True/False 반환
    - has_object_permission(request, view, obj)
      - APIView의 get_object() 함수를 통해 object획득시에 체크
      - 브라우저를 통한 API 접근에서 CREATE/UPDATE Form 노출 시에 체크
      - DjangoObjectPermissions에서 구현



### Filtering과 Ordering

- Filtering

  - 목록조회 APIView에서는 조건에 따라 필터링이 필요
  - 필터링에 필요한 인자 참조
    - self.request.user
    - self.request.GET
    - self.request.query_params
    - self.kwargs

- Generic Filtering / Ordering

  - Django Admin 검색과 유사한 기능

    - 별도 검색엔진이 아닌 DBMS 조건절 활용

  - ```python
    from rest_framework.filters import SearchFilter, OrderingFilter
    
    class PostViewSet(ModelViewSet):
        queryset = Post.objects.all()
        serializer_class = PostSerializer
        ...
        filter_backends = [SearchFilter, OrderingFilter]
        search_fields = ['message']
    ```

  - ordering_fields

  - ordering

- search_fields

  > search_fields = ['=username', '^email']

  - 문자열 패턴 지정
    - ^ : Start-with
    - = : Exact matches
    - $ : Regex search
    - @ : Full-text search (202년 2월 장고의 MySQL 백엔드에서만 지원)
  - get_search_fields 함수로도 구현가능



### Pagination

- DRF에서 기본 지원하는 페이징 방식

  - PageNumberPagination
    - page/page_size 인자를 통한 페이징 처리
  - LimitOffsetPagination
    - offset/limit 인자를 통한 처리

- PageNumberPagination

  - page_size 미지정 상황을 위해 디폴트 지정이 필요
    - settings.py 내 REST_FRAMEWORK = {"PAGE_SIZE": 10} 을 통해 전역 설정
    - PageNumberPagination을 상속받아 default_limit 설정

- 전역 설정

  > settings.py

  ```python
  REST_FRAMEWORK = {
    'PAGE_SIZE': 10,
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
  }
  ```



### Throttling (최대 호출 횟수 제한하기)

- 용어 정리

  - Rate : 지정 기간 내에 허용할 최대 호출 횟수
  - Scope : 각 Rate에 대한 별칭
  - Throttle : 특정 조건 하에 최대 호출 횟수를 결정하는 로직이 구현될 클래스

- 기본 제공 Throttle

  - AnonRateThrottle

    - 인증 요청에는 제한을 두지 않고, 비인증 요청에는 IP 단위로 횟수 제한
    - 디폴트 scope : 'anon'

  - UserRateThrottle

    - 인증 요청에는 유저 단위로 횟수를 제한하고, 비인증 요청에는 IP 단위로 횟수 제한
    - 디폴트 scope : 'user'

  - ScopedRateThrottle

    - 인증 요청에는 유저 단위로 횟수를 제한하고, 비인증 요청에는 IP 단위로 횟수 제한
    - 각 APIView내 throttle_scope 설정을 읽어, APIView 별로 서로 다른 Scpoe을 적용

  - ex

    ```python
    REST_FRAMEWORK = {
        'DEFAULT_THROTTLE_CLASSES': [
            'rest_framework.throttling.UserRateThrottle',
        ],
        'DEFAULT_THROTTLE_RATES': {
          'user': '3/day',
        },
    }
    ```

- 최대 호출 횟수를 넘긴다면?

  - 429 Too Many Requests 응답
  - 예외 메세지에 API 활용이 가능한 시점을 알려줌
    - Throttle의 wait 멤버함수를 통해 계산

- Cache

  - 매 요청 시마다 cache에서 timestamp list를 get/set : 캐시 성능이 중요

- 장고의 Cache 지원

  - 기본 settings의 디폴트 캐시 : 로컬 메모리 캐시
  - 다양한 캐시 지원
    - Memcached 서버 지원
    - 데이터베이스 캐시
    - 파일 시스템 캐시
    - 로컬 메모리 캐시
    - 더미 캐시
  - redis를 활용한 캐시

- Rates 포맷

  - 포맷 : "숫자/간격"
  - 숫자 : 지정 간격 내의 최대 요청 제한 횟수
  - 간격 : 지정 문자열의 첫 글자만 사용.
    - s : 초
    - m : 분
    - h : 시
    - d : 일

- Rates 제한 메커니즘

  - SingleRateThrottle 에서는 요청한 시간의 timestamp를 list로 유지
  - 매 요청시마다
    - cache에서 list를 가져옴
    - 체크 범위 밖의 timestamp 값들은 모두 버림
    - list 크기가 허용범위보다 클경우 요청 거부
    - 크기가 작을경우 list에 추가하고, cache에 다시 저장
  - 클라이언트 IP
    - X-Forwarded-For 헤더와 REMOTE_ADDR 헤더를 참조해서 확정
    - 우선순위 : X-Forwarded-For > REMOTE_ADDR