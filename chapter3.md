# DRF-React Study

## Chapter 3. 장고 Views

### 다양한 응답의 함수 기반 뷰(1)

- View
  - 1개의 HTTP 요청에 대해 > 1개의 뷰가 호출
  - urls.py/urlpatterns 리스트에 매핑된 호출 가능한 객체
  - 웹 클라이언트로부터의 HTTP 요청을 처리
  - 크게 2가지 형태의 뷰
    - FBV
    - CBV
- View 호출시, 인자
  - 1번쨰 인자 : HttpRequest 객체
    - 현재 요청에 대한 모든 내역을 담고 있음
  - 2번째 인자 : 현재 요청의 URL로부터 capture된 문자열들
    - path를 통한 처리 > 매핑된 Converter의 to_python에 맞게 변환된 값이 인자로 전달
- View 호출에 대한 리턴값
  - 필히 HttpResponse 객체
    - 미들웨어에서는 뷰에서 HttpResponse 객체를 리턴하기를 기대함
  - 파일like 객체 혹은 str/bytes 타입의 응답 지원
    - str 문자열을 직접 utf8로 인코딩할 필요 없음
  - 파일 like 객체

### 다양한 응답의 함수 기반 뷰(2)

- Pandas를 통한 CSV 응답 생성
- Pillow를 통한 이미지 응답 생성



### URL Dispatcher와 정규 표현식

- URL Dispatcher
  - 특정 URL 패턴 > View의 List
  - 최상위 URL 패턴에서 include를 통해 트리구조로 뻗어나감
  - HTTP 요청이 들어올때마다 등록된 패턴상의 매핑 리스트를 처음부터 순차적으로 훑음
- path, re_path의 등장
  - path가 만능은 아님
- 정규 표현식
  - 문법
    - 글자에 대한 패턴 + 연속된 출연 횟수 지정
    - 대괄호 내에 1글자에 대한 후보 글자들을 나열
    - ? : 0회 혹은 1회 반복
    - *: 0회 이상 반복
    - +: 1회 이상 반복

- 커스텀 Converter 예시 : Slug Unicode
- 새로운 장고앱 생성시 추천 작업
  - 앱 생성
  - 앱/urls.py 파일 생성
  - 프로젝트/urls.py에 include 적용
  - 프로젝트/settings.py 의 installed_apps에 앱 등록



### 클래스 기반 뷰 시작하기

- View
  - FBV
    - 공통 기능들은 장식자 문법으로 적용
  - CBV
- Class Based View
  - View 함수를 만들어주는 클래스
    - as_view() 클래스 함수를 통해, View 함수를 생성
    - 상속을 통해, 여러 기능들을 믹스인
  - 써드파티 CBV
    - django-braces
- CBV 컨셉 구현해보기
  - 여러 옵션과 메소드를 상속을 통해 구현
- 