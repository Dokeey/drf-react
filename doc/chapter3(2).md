# DRF-React Study

## Chapter 3. 장고 Views

### 장고 기본 CBV API (Base Views)

- Base Views

  > django/views/generic/base.py

  - View
  - TemplateView
    - TemplateResponseMixin
    - ContextMixin
  - RedirectView

- View
  - 모든 CBV의 모체
  - http method별로 지정 이름의 멤버함수를 호출토록 구현
    - get, post
  - CBV.as_view(**initkwargs)

- RedirectView
  - permanent (디폴트 False)
    - True : 301 응답(영구적인 이동) - 검색엔진에 영향
    - False : 302 (임시이동)
  - url = None
    - URL 문자열
  - pattern_name
    - URL Reverse를 수행할 문자열
  - query_string
    - QueryString을 그대로 넘길 것인지 여부

### 장고 기본 CBV API (Generic display views)(1)

- Generic display views
  - DetailView
  - ListView
- DetailView
  - 1개 모델의 1개 object에 대한 템플릿 처리

### 장고 기본 CBV API (Generic display views)(2)

- ListView
  - 1개 모델에 대한 List템플릿 처리
    - 모델명소문자_list 이름의 쿼리셋을 템플릿에 전달
  - 페이징 처리 지원

### 장고 기본 CBV API (Generic display views)(3)

- django-bootstrap4 설치

  > https://django-bootstrap4.readthedocs.io/en/latest/index.html

- pagenation 디자인 추가

### 뷰 장식자

- 장식자(Decorators)
  - 어떤 함수를 감싸는 함수
- 몇가지 장고 기본 장식자
  - django.views.decorators.http
    - require_http_methods, require_GET, require_POST, require_safe
      - 지정 method가 아닐경우, HttpResponseNotAllowed 응답(405)
  - django.contrib.auth.decorators
    - user_passes_test : 지정 함수가 False를 반환하면 login_url로 redirect
    - login_required : 로그인이 안되어있다면 login_url로 redirect
    - permission_required : 지정 권한이 없을때 login_url로 redirect
  - django.contrib.admin.views.decorators
    - staff_member_required : 스태프 멤버가 아닐 경우 login_url로 이동

- CBV에 장식자 적용하기
  - @method_decorator(login_required, name='dispatch')
  - LoginRequiredMixin 사용하기

### 장고 기본 CBV API (Ceneric date views)

- Generic Date Views
  - ArchiveIndexView : 지정 날짜필드 역순으로 정렬
  - YearArchiveView : 지정 year년도
  - MonthArchiveView : 지정 year/month
  - WeekArchiveView
  - DayArchiveView
  - TodayArchiveView : 오늘 날짜
  - DateDetailView : 지정 year/month/day 목록 중 특정 pk의 detail
- 공통 옵션
  - allow_future(디폴트 : False)
    - False : 현재시간 이후의 record는 제외
- ArchiveIndexView
  - 옵션
    - model
    - date_field : 정렬 기준 필드
    - date_list_period
  - context
    - latest : QuerySet
    - date_list : 등록된 record의 년도 목록

### 적절한 HTTP 상태코드로 응답하기

- HTTP 상태코드
  - HttpResponse 클래스마다 고유한 status_code가 할당
  - REST API 만들때 특히 유용
- 대표 상태코드
  - 200번대 : 성공
  - 300번대 : 요청을 마치기 위해, 추가 조치가 필요
  - 400번대 : 클라이언트측 오류
  - 500번대 : 서버측 오류
- 302 대표방법
  - 숏컷 - redirect
- 404 응답 예
  - get_objetc_or_404
  - Http404
- 500 응답하는 몇 가지 예
  - 뷰에서 요청 처리 중, 뷰에서 미처 잡지못한 오류가 발생했을때
  - 예외가 발생할 여지가 있는 코드만 타이트하게 코딩

### URL Reverse를 통해 유연하게 URL 생성하기

-  URL Dispatcher
  - urls.py 변경만으로 각 뷰에 대한 URL이 변경되는 유연한 URL 시스템
  - HTML 파일 하나하나 URL을 일일히 계산할 필요없다.
- URL Reverse를 수행하는 함수
  - url 템플릿태그
    - 내부적으로 reverse 함수
    - {% url "blog:post_detail" 100 %}
  - reverse 함수
    - url 문자열 반환
    - reverse('blog:post_detail', args=[100])
  - resolve_url 함수
    - url 문자열 반환
    - resolve_url('blog:post_detail', 100)
  - redirect 함수
    - redirect('blog:post_detail', 100)
    - 301 or 응답
- 모델 객체에 대한 detail 주소 계산
  - resolve_url(post)
  - redirect(post)
  - 활용하려면 모델의 get_absolute_url 구현
- get_absolute_url() 구현
  - resolve_url 함수는 가장 먼저 get_absolute_url() 함수의 존재여부를 확인하고, 존재할 경우 reverse를 수행하지 않고 그 리턴값 즉시 리턴
  - 그외 활용
    - CrateView / UpdateView
      - success_url을 제공하지 않을경우 해당 함수를 참조함

