# DRF-React Study

## Chapter 2. 장고 Models

### Queryset의 정렬 및 범위 조건

- 정렬 조건 추가
  - DB에서 다수 필드에 대한 정렬을 지원
    - 가급적 단일 필드로 하는 것이 성능에 이익
    - 시간순/역순 정렬이 필요한 경우, id필드를 활용
  - 2가지 방법
    - 추천) 모델 Meta 속성으로 ordering 설정 : list 지정
    - queryset에 order_by
  - django-extensions 활용하여 테스트
    - `python manage.py shell_plus --print-sql --ipython`
- 슬라이싱을 통한 범위조건
  - 역순 슬라이싱은 안됨
  - 객체[start:stop:step]
    - offset : start
    - limit : stop - start
    - step은 쿼리에 대응 되지않음. 비추천
    - step이 들어간순간 리스트로 반환 > DB에 그 즉시 접근하기 때문에 비효율

### django-debug-toolbar를 통한 SQL 디버깅

- django-debug-toolbar
  - request/response에 대한 다양한 디버깅 정보를 보여줌
  - 다양한 panel 지원
  - Ajax 요청에 대한 지원은 불가능
  - body 태그가 꼭 있어야 동작함
- 코드를 통한 SQL 내역확인
  - QuerySet의 쿼리 속성 참조
    - print(쿼리셋.query)
  - settings.DEBUG = True 시에만 쿼리 실행내역을 메모리에 누적
  - 쿼리 초기화
    - 메모리에 누적되기에 프로세스가 재시작시 초기화
    - django.db.reset_queries() 통해서 수동 초기화도 가능
- django-querycount
  - SQL 실행내역을 개발서버에 콘솔 표준출력
  - Ajax 내역도 출력가능

### 관계를 표현하는 모델 필드(ForeignKey)

- RDBMS에서의 관계 예시
  - 1:N 관계 > foreignkey로 표현
    - 1명의 유저가 쓰는 다수의 포스팅
    - 1명의 유저가 쓰는 다수의 댓글
    - 1개의 포스팅에 다수의 댓글
  - 1:1관계 > 원투원
    - 1명의 유저는 1개의 프로필
  - M:N 관계 > ManyToMany
    - 1개 포스팅에 다수의 태그
    - 1개 태그에 다수의 포스팅
- ForeignKey
  - 1:N 관계에서 N측에 명시
  - to 인자 (대상 모델)
    - 클래스를 직접 지정하거나
    - 클래스명을 문자열로 지정. 자기 참조는 'self' 지정
  - on_delete 인자 (Record 삭제시 Rule)
    - CASCADE : FK로 참조하는 다른 모델의 레코드도 삭제
    - PROTECT : ProtectedError 를 발생시키며 삭제 방지
    - SET_NULL : null로 대체. 필드에 null=True 옵션 필수
    - SET_DEFAULT : 디폴트 값으로 대체. 필드에 디폴트값 지정 필수
    - SET : 대체할 값이나 함수 지정. 함수의 경우 호출하여 리턴값을 사용
    - DO_NOTHING : 어떠한 액션 X, DB에 따라 오류가 발생 할 수도 있음

- FK에서의 reverse_name

  ```python
  cmt = Comment.objects.first()
  cmt.post
  # Post.objects.get(pk=comment.post_id)
  ```

  - 그 반대

  ```python
  post.comment_set.all()
  # Comment.objects.filter(post=post)
  ```

- reverse_name의 충돌

  - 앱이름은 고려 안하고, 모델명만 고려함
  - 두개의 앱에 같은 모델명을 가진 클래스가 있다면 충돌
  - makemigrations 명령이 실패
  - FK의 reverse_name을 변경
    - related_name 인자 추가
    - related_name='+'
      - 이름 포기

- ForeginKey.limit_choices_to 옵션

  - Form을 통한 Choice 위젯에서 선택항목 제한 가능
    - dict/Q 객체를 통한 지정 : 일괄지정
    - dict/Q 객체를 리턴하는 함수 지정 : 매번 다른 조건 지정 가능
  - ManyToMany 에서도 지원

### OneToOne 필드

- OneToOne
  - 1:1 관계 필드
  - FK와 비슷하지만 reverse 차이
    - profile.user_set.first()
    - profile.user

### ManyToMany 필드

- ManyToMany
  - M:N 관계 필드
  - 어느 쪽이라도 필드 지정 가능
- RDBMS지만, DB따라 NoSQL 기능도 지원
  - djkoch/jsonfield
    - 대개의 DB엔진에서 사용가능
    - TextField/CharField를 래핑
    - dict 등의 타입에 대한 저장을 직렬화하여 문자열로 저장
  - django.contrib.postgres.fields.JSONField

### 마이그레이션을 통한 DB 스키마 관리

- Migrations
  - 모델의 변경내역을 DB스키마로 반영시키는 효율적인 방법을 제공
    - makemigrations
    - migrate
    - showmigrations
    - sqlmigrate
      - 지정 마이그레이션의 SQL 내역 출력
- Migrations 파일
  - 디비에 어떤 변화를 가하는 Operation들을 나열
  - 대개 모델로부터 자동 생성 > makemigrations 명령
- 언제 makemigrations 하는가
  - squashmigrations 명령으로 다수의 마이그레이션 파일 통합
- 아예 migrate 취소 : zero
- id필드 존재 이유
  - 식별기준인 기본키(primary key)
  - 다른 필드를 기본키로 지정하고 싶으면 primary_key=True
- 새로운 필드가 필수 필드라면
  - 필수필드 여부 : blank/null 옵션이 모두 false 일때
  - 추후 makemigrations 명령 수행시 기존 레코드들에 어떤 값을 채울지 묻는다.
- 협업 Tip
  - 팀원 각자가 마이그레이션 파일 생성
  - 추천) 마이그레이션 파일 생성은 1명이 전담하여 버전관리
- Tip
  - 서버에 아직 반영안된 마이그레이션을 다수 생성했다면
  - 하나의 마이그레이션으로 합쳐서 적용하기를 권장
  - 방법
    - 서버로의 미적용 마이그레이션들을 모두 롤백 > 롤백된 마이그레이션들을 모두 제거 > 새로이 마이그레이션 파일 생성
    - 미적용 마이그레이션들을 하나로 합치기 > squashmigrations