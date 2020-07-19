# DRF-React Study

## Chapter 4. 웹 프론트엔드 기초 및 장고 static

### JavaScript와 jQuery

- Ajax GET/POST 요청
  - 브라우저의 동일 도메인 참조 정책(Same-Origin Policy)
    - 여러 도메인에 걸쳐서 구성되는 웹서비스가 늘어나는 시점에서
    - Cross Domain Request를 허용하기위해 CORS 지원
  - Django 뷰에서는 POST를 받을때 CSRF Token 값을 체크
- 여러 도메인에 대하 요청을 허용하고 싶으면 CORS 설정을 추가
  - Access-Control-Allow-Origin
  - 타 사이트의 자원을 가져오고 싶다면
    - dataType: 'jsonp' 

### 장고가 Static 파일을 다루는 방법

- 장고 static 파일 경로

  - 장고는 One Project, Multi App 구조
  - 한 app을 위한 static 파일은 app/static/app 경로
  - 프로젝트 전반적으로 사용되는 파일은 settings.STATICFILES_DIRS 에 경로 지정
  - 다수 디렉터리에 저장된 static 파일은 collectstatic 명령으로 settings.STATIC_ROOT에 지정한 경로로 모아서 서비스에 사용

- settings 예시

  - STATIC_URL
    - 각 static 파일에 대한 URL Prefix
    - 템플릿 태그 {% static "경로" %} 에 의해서 참조되는 설정

- Static Files Finders

  - Template Loader와 유사
    - 설정된 Finders를 통해 static 템플릿이 있을 디렉터리 목록을 구성
    - 장고 서버 초기 시작시에 1회 작성
    - 해당 디렉터리 목록에서 지정 상대경로를 가지는 static 파일 찾기
  - 대표적인 2가지 Static Files Finders
    - App Directories Finder
      - 장고앱/static/ 경로를 디렉터리 목록에 추가
    - File System Finder
      - settings.STATICFILES_DIRS 설정값을 디렉터리 목록에 추가

- 템플릿에서 static URL 처리 예시

  - Template Tag를 통한 처리

    - 프로젝트 설정에 따라 유연하게 prefix가 할당됨

    - ```django
      {% load static %}
      <img src="{% static "blog/title.png" %}">
      ```

- 개발환경에서의 static 파일 서빙

  - DEBUG = True 일때에만 지원
  - False일때는 static 서빙을 따로 설정해줘야함

- 서빙을 하는 여러가지 방법

  - 클라우드 정적 스토리지나 CDN 서비스
  - apache/nginx 웹\ 서버 등을 통한 서빙
  - 장고를 통한 서빙
    - whitenoise 라이브러리 활용 > 헤로쿠 배포 필요

- collectstatic 명령

  - 여러 디렉터리에 분산되어 있는 static 파일을 한곳에 복사
  - 외부 웹서버는 static의 위치를 모르기때문. (장고만 알고있음)