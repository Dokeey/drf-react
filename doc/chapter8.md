# DRF-React Study

## Chapter 8. 장고 DRF를 활용한 웹 API 만들기

### API 서버와 REST

- API 서버

  - 앱/웹 서비스를 만드는 개발자들이 이용하는 데이터 위주의 서비스
  - 시간이 지나도 호환성을 유지해야 함
    - 앱 등의 유저가 사용하는 UI는 유저가 원할 때 업데이트가 됨
    - 유저층이 사용하는 앱의 버전이 다양하기에 API에도 버전 개념을 둠
      - /api/v1/posts, /api/v2/posts
    - 그에 반해, 웹 서비스를 이용하는 유저는 항상 최신버전을 사용

- REST(Representational State Transfer)

  - 아키텍처 스타일. 프로토콜에 독립적 -> 일반적인 REST 구현에서 HTTP를 사용
  - RESTful API의 몇가지 디자인 원칙
    - 리소스를 중심으로 디자인
    - 클라이언트에서 엑세스할 수 있는 모든 종류의 개체/서비스가 리소스에 포함
    - 리소스마다 해당 리소스를 고유하게 식별하는 식별자
    - 요청/응답 포맷으로 흔히 JSON을 사용
    - 균일한 인터페이스를 적용
      - 리소스에 표준 HTTP 동사 (GET, POST, PUT, PATCH, DELETE)를 적용

- 리소스를 중심으로 API 구성

  - 심플하게 URI을 구성하기
    - /customers/1/orders/99/products/
      - 유연성 떨어짐
    - /customers/1/orders/
    - /orders/99/products/

- HTTP 메서드를 기준으로 기본 작업 정의

  - GET : 리소스의 표현. 응답 본문에 리소스의 세부 정보
  - POST : 새 리소스 요청. 응답 본문에 새 리소스의 세부 정보 제공 > 멱등성 미보장
  - PUT : 기존 리소스를 대체. 응답 본문에 갱신할 리소스 정보를 제공 > 반드시 멱등성 보장
  - PATCH : 기존 리소스를 부분 대체. 응답 본문에 갱신할 리소스 정보를 제공 > 멱등성 미보장
  - DELETE : 지정 리소스 제거

  > 멱등성 : 같은 요청을 계속 해도 서버에선 같은 결과가 보장되는 특성

- 요청/응답 형식 지정

  - 요청 : Content-Type 헤더
    - ex) application/json, application/vnd.ms-excel, imgae/jpeg, application/pdf 등
    - 요청 시에 처리를 원하는 형식 지정하면, 서버에서는 이 형식으로 응답
    - 서버에서 해당 형식을 지원하지 않으면 HTTP 상태코드 415 반환

- HTTP method 별 다양한 상태 코드

  - GET : 일반적으로 200, 못찾으면 404 응답
  - POST : 201응답
    - 새 리소스의 URI는 응답의 Location 헤더에 넣어줄수있음
    - 새 리소스를 만들지 않았다면 200 응답. 응답 본문에 포함할 수도
    - 반환할 결과가 없으면 204
    - 잘못된 데이터로 요청하면 400응답. 응답 본문에 오류정보 or 자세한 정보 제공하는 URI 링크 포함
  - PUT
    - 기존 리소스를 업데이트 할 경우 200 또는 204(내용없음) 반환
    - 상황에 따라 업데이트 안되면 409(충돌) 반환
  - DELETE
    - 성공하면, 응답 본문에 추가 정보가 포함되지 않았음의 의미로 204 응답.
    - 리소스 없으면 404 응답
  - 비동기 작업
    - 요청은 수락되었지만 아직 완료가 안됐다는 뜻으로 202 응답
    - 클라이언트가 Polling을 통해 모니터링할 수 있도록, 비동기 요청의 상태를 반환하는 URI을 Location 헤더로 반환

- django-rest-framework

  - Serializer/ModelSerializer를 통한 데이터 유효성 검증 및 데이터 직렬화
  - 각종 Parser를 통한 데이터 처리
  - APIView/Generic/ViewSet/ModelViewSet를 통한 요청 처리
  - 각종 Renderer를 통한 다양한 응답 포맷 지원
  - 인증/권한 체계 - 써드파티를 통해 JWT 지원
  - Throttling (최대 호출 횟수 제한)

- CRUD

  - Create
  - Read, Retrieve
  - Update
  - Delete
  - 리소스에 대한 대표적 동작이고, API의 전부는 아님

### JSON 응답뷰 만들기

- HTTPie

  - 기본 사용법

    ```bash
    http GET 요청할주소 GET인자명==값
    http --form POST 요청할주소 GET인자명==값 POST인자명=값
    http PUT 요청할주소 GET인자명==값 PUT인자명=값
    ```

  - 2종류의 POST 요청

    - --form 옵션 지정 : multipart/form-data
    - --json 옵션을 지정하거나 생략 : application/json

  - httpbin.org 서비스를 통해 연습하기

    - ```bash
      http GET httpbin.org/get x==1 y==2
      http --form POST httpbin.org/post a=1 b=2 c=3
      http PUT httpbin.org/put hello=world
      http DELETE httpbin.org/delete
      ```

### JSON 직렬화

- 직렬화(Serialization)

  - 모든 프로그래밍 언어의 통신에서 데이터는 필히 문자열로 표현되어야만 함
    - 송신자 : 객체를 문자열로 변환하여, 데이터 전송 > 직렬화
    - 수신자 : 수신한 문자열을 다시 객체로 변환하여 활용 > 비직렬화
  - 각 언어에서 모두 지원하는 직렬화 포맷(JSON, XML 등) 도 있고
  - 특정 언어에서만 지원하는 직렬화 포맷(파이썬은 Pickle)이 있음

- JSON 포맷과 PICKLE 포맷

  - JSON 포맷
    - 다른 언어/플랫폼과 통신할 때 주로 사용
    - 표준 라이브러리 json 제공
    - pickle에 비해 직렬화를 지원하는 데이터타입의 수가 적지만, 커스텀 Rule 지정도 가능
  - PICKLE 포맷
    - 파이썬 전용 포맷으로써 파이썬 시스템끼리만 통신할때 사용
    - 표준 라이브러리 pickle 제공 > json 라이브러리와 유사한 사용 방법
    - 주의) 파이썬 버전 특성을 타는 경우가 있음

- json 라이브러리

  - ensure_ascii = True
    - 데이터를 유니코드값으로 변환
  - json.dumps('한글', ensure_ascii=False).encode('utf-8')

- JSON, DjangoJSONEncoder 는 쿼리셋 변환 미지원

  - 상속을 통해 추가적인 커스텀이 필요함

- rest_framework.renderer.JSONRender

  - json.JSONEncoder 상속을 통해 구현
  - datetime/date/time/timedelta, decimal, uuid, six_binary
  - '\__getitem__' 속성을 지원할 경우 dict(obj) 변환
  - '\__iter__' 속성을 지원할 경우 tuple 변환
  - QuerySet 타입일 경우 tuple 변환
  - .tolist 속성을 지원할 경우 obj.tolist() 반환
  - Model 타입은 미지원 -> ModelSerializer를 통한 변환

- rest_framework.renderer.JSONRenderer

  - json.dumps에 대한 래핑 클래스 > 보다 편한 직렬화 지원
  - 모델 객체에 대한 변환은 아직 없음

- ModelSerializer를 통한 JSON 직렬화

  - Form/ModelForm 과 달리 Form태그가 포함된 HTML을 생성하는게 아닌,
  - Form 데이터가 포함된 JSON 문자열을 생성
  - returnDict 타입 반환
  - 쿼리셋을 직렬화할때 many=True 인자 추가

- ReturnDict 타입

  - serializer.data의 데이터 타입
  - Orderdict를 상속받음
  - JSON 라이브러리를 통해 해당 데이터를 직렬화할 수 있음

- 장고 기본 View에서의 HttpResponse JSON 응답

  - 직접 json.dumps를 통해 직렬화된 문자열을 획득하여 HttpRsponse를 통해 응답
  - 1번을 정리하여 JsonResponse 지원
    - 내부적으로 json.dumps를 사용하며 DjangoJSONEncoder가 디폴트 지정

- JsonResponse에서의 QuerySet을 JSON 직렬화

  - 커스텀을 통해 직렬화

- DRF를 통한 HttpResponse JSON 응답

  - DRF Response 활용

  - ```python
    qs = Post.objects.all()
    
    serializer = PostSerializer(qs, many=True)
    
    from rest_framework.response import Response
    response = Response(serializer.data) # Content-type: text/html 디폴트 지정
    ```

  - Lazy하게 동작.

  - 실제 응답 생성시에 .rendered_content 속성에 접근하며, 이때 변환이 이뤄짐

- Response와 APIView

  - DRF의 모든 뷰는 APIView를 상속받음
  - APIView를 통해 Response에 다양한 속성이 지정됨

### APIView를 활용한 뷰 만들기

- DRF의 기본 CBV인 APIView
  - FBV로 구현한다면 @api_view 장식자 사용
  - 기본 속성
    - renderer_classes
      - JSONRenderer
      - TemplateHTMLRenderer
    - parser_classes
      - JSONParser
      - FormParser
      - MultiPartParser
    - authentication_classes
      - SessionAuthentication
      - BasicAuthentication
    - throttle_classes
    - permission_classes
      - 디폴트는 누구라도 접근 허용
    - content_negotiation_class
      - 같은 URL로의 요청이지만, JSON응답인지 HTML응답을 요구하는지 판단
    - metadata_class
    - versioning_class
      - 버전정보 탐지
      - 요청 URL, GET, HEADER에서 버전정보 탐지 후 해당 버전의 API뷰가 호출되도록
- APIView
  - 하나의 CBV이므로 하나의 URL만 처리가능
  - 각 method에 맞게 멤버함수를 구현하면, 해당 method요청이 들어올때 호출
  - 초반에 처리하는 작업 (dispatch 함수 내 initial 함수)
    - 직렬화/비직렬화 처리
    - 인증 체크
    - 사용량 제한 체크 : 호출 허용량 범위인지 체크
    - 권한 클래스 지정 : 비인증/인증 유저에 대해 해당 API호출을 허용할 것인지
    - 요청된 API 버전 문자열을 탐지하여, request.version에 저장
  - 뷰가 csrf_exempt 장식자로 이미 감싸져있기 때문에 POST요청에서 csrf_token 체크를 하지 않음

