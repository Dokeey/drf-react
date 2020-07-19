# DRF-React Study

## Chapter 2. 장고 Models

### 장고 모델 (ORM) 소개

- 다양한 데이터 저장방법
  - 디비 : RDBMS, NoSQL 등
  - 파일 : 로컬, 외부 정적 스토리지 등
  - 캐시서버 : memcached, radis 등
- 데이터베이스와 SQL
  - 종류
    - RDBMS (관계형 데이터베이스 관리 시스템)
    - NoSQL
      - MongoDB, Cassandra, CouchDB, Google Big Table
  - SQL
    - 같은 작업을 하더라도 보다 적은 수의 SQL, 높은 성능의 SQL
    - ORM을 통해 SQL을 생성/실행함
    - ORM을 쓰더라도 내가 작성된 ORM코드가 어떤 SQL이 실행되는지 파악해야함
      - django-debug-toolbar 적극 활용
- 장고 ORM인 모델은 RDB만을 지원
- 다양한 파이썬 ORM
- 장고의 최고강점은 Model과 Form
  - 가능하면 ORM을 사용
  - SQL Injection 방지
- Django Model
  - 디비 테이블과 파이썬 클래스 1:1 매핑
  - 모델 클래스명은 단수형으로 지정
  - 첫글자는 필히 대문자
  - 매핑되는 모델 클래스는 DB 테이블 필드 내역이 일치 해야함
  - 모델을 만들기 전에, 서비스에 맞게 디비 설계 필수
- 모델명과 DB테이블명
  - DB 테이블명 : 디폴트 "앱이름_모델명"
  - 커스텀 : Meta 클래스의 db_table 속성
    - makemigrations 하기전에 적용

- 적용순서
  - Item 모델 정의
  - 마이그레이션 파일 생성
  - 마이그레이션 파일 적용
  - 디비 확인

### 장고 모델 필드

- 기본 지원 모델필드 타입
  - Primary Key : AutoField, BigAutoField
  - 문자열 : CharField, TextField, Slug
  - 날짜/시간 : DataTime
  - 참/거짓 : Boolean
  - 숫자
  - 파일
  - 이메일
  - URL
  - UUID
  - IP
  - Relationship Type
  - 다양한 커스텀 필드 : django-model-utils
- 모델필드들은 DB 필드타입을 반영
  - DB에서 지원하는 필드들을 반영
  - 파이썬 데이터타입과 데이터베이스 데이터타입을 매핑
  - 같은 모델필드라 할지라도 DB에 따라 다른타입이 될 수 있다
- 자주 쓰는 필드 공통 옵션
  - blank : 장고 단에서 vbalidation시에 empty 허용 여부
  - null
  - db_index
  - default
  - unique : 현재 테이블 내에서 유일성 여부
  - choices
  - validators : 벨리데이터를 수행할 함수를 다수 지정
  - verbose_name
  - help_text
- 최대한 필드타입을 타이트하게 지정해주는 것이 입력값 오류를 막을 수 있음
  - 필요한만큼 validators들을 추가하여 타이트하게 지정
  - 백엔드 유효성 검사도 필수
  - 이미 잘 구성된 Features들을 가져다 쓰자. DRF의 serializer를 통해 지원됨

### 장고 admin을 통한 데이터 관리

- django admin
  - django.contrib.admin 앱을 통해 제공
    - 기본 admin URL 변경 권장
    - django-admin-honeypot 을 통해, 가짜 admin 페이지 노출
  - 모델 클래스 등록을 통해, 조회 추가 수정 삭제 웹 UI 제공
    - 서비스 초기 관리도구로서 제격
  - 내부적으로 DJango Form을 적극적으로 사용
- 모델 클래스를 admin에 등록하기

```python
from django.contrib import admin
from .models import Item

# 등록법 1
admin.site.register(Item)

# 등록법 2
class PostAdmin(admin.ModelAdmin):
  pass
admin.site.register(Post, PostAdmin)

# 등록법 3
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
  pass
```

- 모델 클래스에 __str__ 구현
- list_display 속성 정의
- list_display_links
- search_fields 정의
  - icontains 처리
- list_filter

### Media 파일 다루는 법

- Static & Media 파일
  - Static 파일
    - 개발 리소스로서의 정적인 파일 (js, css, image 등)
    - 앱 / 프로젝트 단위로 저장
  - Media 파일
    - FileField/ImageField를 통해 저장한 모든 파일
    - DB필드는 저장경로를 저장하며, 파일은 파일 스토리지에 저장
      - 실제로 문자열을 저장하는 필드
    - 프로젝트 단위로 저장/서빙
- MEDIA_ROOT, URL 경로 정하기
  - URL : 미디어 파일을 찾을때 참고
  - ROOT : 미디어 파일을 저장할때 참고
- FileField와 ImageField
  - FileField
    - File Storage API를 통해 파일을 저장
    - django-storages를 통해 확장지원
  - Image
    - Pillow를 통해 이미지 width/height 획득
    - url
      - 웹의 경로
    - path
      - 시스템상의 경로
  - 커스텀필드
    - PDF, 엑셀
- 필드 옵션
  - blank 옵션
    - 업로드 옵션처리 여부
  - upload_to 옵션
    - settings.MEDIA_ROOT 하위에서 저장한 파일명/경로명 설정
    - 동일 파일명으로 저장시, 더미 문자열을 붙여 파일 덮어쓰기 방지
- 미디어 파일은 자동으로 삭제되진 않음
- upload_to
  - 문자열로 지정 : 파일 디렉터리까지 지정가능
  - 함수로 지정 : 파일명 까지 지정가능
- File Upload Handler
  - 파일크기가 2.5MB 이하일 경우
    - 메모리에 담겨 전달
  - 그 이상일 경우
    - 디스크에 담겨 전달
  - 관련 설정
    - settings.FILE_UPLOAD_MAX_MEMORY_SIZE
    - 디폴트로 2.5MB 설정됨