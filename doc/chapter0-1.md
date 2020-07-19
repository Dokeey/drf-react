# DRF - React Study

## Django

- MVC 방식
  - Model, Template, View

## React

### SPA

- 원래 웹 문서의 기본 동작 방식
  - 요청마다 모든 전체화면에 대하여 HTML/CSS/JavaScript 를 가져와 로딩함
  - 웹 문서에 적합한 방식
- SPA 방식의 화면 전환
  - JavaScript를 통해 화면 변경 > 화면 전환 느낌이 남
  - 필요 시 백그라운드에서 JavaScript로 서버와 통신
  - 웹 애플리케이션에 적합한 방식

### 자바스크립트 버전

- ES6 (2015)
  - class 와 같은 기능 지원
  - ES3, ES5 문법은 잊어라



## Python, Django 설치

```bash
$ pyenv install 3.7.4
$ pyenv global 3.7.4
$ python -m venv drflib
$ source drflib/bin/activate
$ pip install "django~=3.0.0"
$ django-admin --version
```

- pyenv 로 시스템 python 버전을 python 3.7.4 버전으로 바꾼다.
- workspace에 파이썬 가상환경을 설치하고 적용한다.
- django 3.0 버전의 최신버전 설치



## Django 프로젝트 생성

- django-admin startproject [프로젝트명]

```bash
$ django-admin startproject drf_react # 프로젝트 생성
$ python manage.py migrate # 초기 DB 테이블 만들기
$ python manage.py createsuperuser # 수퍼유저 생성
$ python manage.py runserver 0.0.0.0:8000 # 서버 구동
```

- manage.py
  - 명령행을 통해 각종 장고 명령 수행
- drf_react
  - 프로젝트명으로 생성된 디렉터리. 함부로 수정하면 안됨
  - \__init__.py : 모든 파이썬 패키지에 있다. 패키지를 임포트할 때의 임포트 대상
  - settings.py : 현재 프로젝트의 기본설정(django/conf/global_settings.py)을 덮어쓸 설정들.
  - wsgi.py : 실서비스에서의 웹서비스 진입점
  - 등 프로젝트 이름을 참조하고 있음
- 3.0 버전이상에서는 asgi.py 가 추가되었음
  - 비동기통신 지원



## Django 주요 구성요소

### 주요 기능

- FBV : 함수로 HTTP 요청 처리
- Models : 데이터베이스와의 인터페이스
- Templates : 복잡한 문자열 조합을 보다 용이하게. 주로 HTML 문자열 조합 목적으로 사용하고 푸쉬 메세지나 이메일 내용을 만들때에도 편리
- Admin 기초 : 심플한 데이터베이스 레코드 관리 UI
- Logging : 다양한 경로 메세지 로깅
- Static files : 개발 목적 정적파일 관리
- Messages framework : 유저에게 1회성 메세지 노출
- CBV : 클래스로 함수 기반 뷰 만들기
- Forms : 입력폼, 입력값 유효성 검사 및 DB로의 저장
- 테스팅
- 국제화 & 지역화
- 캐싱
- Geographic : DB의 Geo 기능 활용 (PostgreSQL 중심)
- Sending Emails
- Syndication Feeds (RSS/Atom)
- Sitemaps



## Djnaog 앱

- 재사용성을 목적으로 한 파이썬 패키지
- settings.INSTALLED_APPS 에 등록해줘야 함