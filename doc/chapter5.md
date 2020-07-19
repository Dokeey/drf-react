# DRF-React Study

## Chapter 5. 장고 Forms

### HTML Form

- 언제 쓰는가
  - HTML Form(클라이언트 측)
    - 클라이언트에서 입력폼을 제공하고 이를 서버로 전송하고자 할때
  - Djnago Form(서버 측)
    - 받은 값의 유효성 검사 수행 / 데이터베이스에 저장하는 등의 처리 (POST요청)
    - HTML Form을 생성하는 기능(GET 요청)
- HTML Form
  - form 태그를 통해 입력폼 구성
  - submit 시에 지정 action URL로 데이터 전송 시도
- Form 태그 필수 속성
  - action : 요청을 보낼 주소
  - method : 전송 방식
    - GET, POST
  - enctype : 인코딩 방식
    - POST 요청에만 유효
    - GET 요청에서는 하나의 방식만 강제됨
- form의 enctype
  - "apllication/x-www-form-urlencoded" (디폴트)
    - GET 요청에서는 이 유형이 강제됨
    - 인자들은 URL 인코딩을 수행하여 쿼리스트링 형태로 전달
    - 파일 업로드 불가
  - "multipart/form-data"
    - 파일 업로드 가능
- url encode
  - 키, 값 쌍이 & 문자로 이어진 형태
  - 공백은 +, 스페셜 문자들은 ascii 16진수 문자열/UTF8 인코딩 16진수 문자열로 변환
- Form 요청에서 인자 보내는 2가지방법
  - 요청 URL 뒤에 ? 를 붙이고 인자 실어보내기 (쿼리스트링)
    - 주로 GET 요청에서 사용
    - POST 요청에도 가능
  - Body에 모든 인코딩의 인자를 실어 보냄
    - 파일 업로드 가능
  - GET
    - 헤더만 존재
  - POST
    - 바디 영역까지 존재
    - 헤더와 바디 사이 공백한줄로 구분
- GET 요청 예시
  - 주로 검색폼에서 인자를 넘길때 쓰임.
  - 조회 목적
- Django View 에서 인자 접근
  - request.GET
    - 모든 쿼리스트링 인자 목록
      - 쿼리스트링을 파싱한 QueryDict 객체
    - GET/POST 요청에서 모두 가능
  - request.POST
    - POST 요청에서만 가능
    - 파일 내역은 제외한 모든 POST인자 목록
    - 요청 BODY를 파싱한 QueryDict 객체
  - request.FILES
    - POST 요청에서만 가능
    - 요청 BODY에서 파일내역만 파싱한 MultiValueDict 객체

### HttpRequest와 HttpResopnse

- HttpRequest 객체
  - 클라이언트로부터의 모든 요청 내용을 담고 있음
    - FBV : 뷰 함수의 첫번째 인자 request로 전달
    - CBV : self.request를 통해 접근
  - Form 처리 관련 속성
    - .method : 요청의 종류로서 모두 대문자
    - .GET
    - .POST
    - .FILES
- QueryDict(MultiValueDict)
  - 같은 키에 여러 값
  - 수정 불가능한 특성
  - 예) http 에선 같은 photo 값에 여러 사진이 들어갈수 있음
- MultiValueDict(dict)
  - dict을 상속받은 클래스
  - 동일 key의 다수 value를 지원하는 사전
- HttpResponse
  - 다양한 응답을 Wrapping : HTML 문자열, 이미지 등등
  - 파일-like 객체
  - 사전-like 인터페이스로 응답의 커스텀 헤더 추가/삭제
- JsonResponse
- StreamingHttpResponse
  - 효율적인 큰 응답을 위함
    - 혹은 메모리를 많이 먹는 응답 -> iterator를 통한 응답
  - 하지만 Django는 short-lived 요청에 맞게 디자인
  - Http Response를 상속받지 않음
    - 필히 iterator를 지정해야만 제대로 동작
    - .streaming_content 사용
- FileResponse
  - StreamingHttpResponse 상속받음

### Form

- Form
  - 입력폼 HTML 생성
  - 유효성 검증 및 값 변환
  - 검증 통과한 값들을 dict형태로 제공
- 모델폼
- 필드 별로 유효성 검사 함수 추가 적용 가능
  - 모델에서 유효성검사를 적용해 놓으면 추후 모델폼에서 해당 유효성 검사를 적용함
- 모델을 풍성하게 만들자

### Cross Site Request Forgery

- 사이트 간 요청 위조 공격
  - 사용자가 의도하지 않게 게시판에 글을 작성하거나, 쇼핑을 하게 하는 등의 공격
  - 특정 웹사이트가 유저의 웹브라우저를 신용하는 상태를 노린것
  - 공격자 사이트에 접속만해도 자동으로 POST 전송
- 공격을 막기 위해 Token을 통한 체크
  - POST 요청에 한해 CsrfViewMiddleware를 통한 체크
    - post 요청 받을때 Token값이 없거나 유효하지 않다면 403에러
  - 처리 순서
    - form을 보여줄때, CSRF Token 값도 값이 할당
      - CSRF TOken은 USER마다 다르며, 계속 변경
    - 그 입력 Form을 통해 Token값이 전달 되면 Token 유효성 검증
- CSRF Token 체크를 해제 하려면
  - view에서 @csrf_exempt 장식자 활용
- 앱 API에서는 끄자
  - DRF에서는 APIView에서 csrf_exempt가 적용되어 있음
  - 별도의 유저인증 토큰을 사용하기 때문에

### ModelForm

- ModelForm
  - 장고 Form을 상속
  - 내부적으로 Model Instance를 유지
- ModelForm.save(commit=True)
  - Form의 cleand_data를 Model Instance 생성에 사용하고 그 Instance를 리턴
  - commit을 False를 할 경우 실제 데이터는 생성되지 않음
    - instance.save() 호출을 지연시키고 싶을때 사용
- commit=False 예시
  - 작성자 같은 경우 request.user를 지정하면 되기 때문에 False 후 따로 유저 저장 뒤에 save
- Form을 끝까지 쓰자
  - form.cleaned_data['message'] 와 같이 유효성이 통과된 값을 사용
  - request.POST['message'] 와 같은 데이터는 쓰지말자

### Form Validation

- 유효성 검사가 수행되는 시점
  - is_valid() 함수가 호출되었을때
- 유효성 검사 호출 로직
  - form.full_clean() 호출
    - 각 필드 객체 별로
      - 각 필드객체.clean() 호출을 통해 각 필드 type에 맞춰 유효성 검사
    - Form 객체 내에서
      - 필드 이름 별로 Form객체.clean_필드명() 함수가 있다면 호출해서 유효성 검사
      - Form객체.clean() 함수가 있다면 호출해서 유효성 검사
      - DRF 에서는 clean 대신 validate라는 이름을 사용
  - 에러 유무에 따른 True/False 리턴
- 2가지 유효성 검사
  - validator 함수를 통한 유효성 검사
    - 값이 맞지 않으면, ValidationError 예외 발생
  - Form 클래스 내 clean, clean_멤버함수를 통한 검사
    - 값이 맞지 않으면, ValidationError 예외 발생
    - 리턴값을 통해 값 반환
- 함수형/클래스형 Validator
  - 함수형
  - 클래스형
- Form clean 멤버함수에게 기대하는 것
  - 필드별 Error 기록 혹은 Non 필드 Error 기록
    - ValidationError 기록 
    - add_error 기록
  - 원하는 포맷으로 값 변경
- 용도
  -  validators
    - 가급적이면 모든 validators는 모델에 정의
  - clean
    - 특정 form에서 1회성 유효성 검사 루틴이 필요할때
    - 다수 필드값에 걸쳐서 유효성 검사가 필요할때
    - 필드 값을 변경할 필요가 있을때