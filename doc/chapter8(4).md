# DRF-React Study

## Chapter 8. 장고 DRF를 활용한 웹 API 만들기

### Token 인증 적용하기

- DRF에서 지원하는 인증
  - Session
    - 웹 프론트와 장고가 같은 호스트라면 사용가능
    - 외부에선 못씀
  - Basic
    - 외부에서 매번 user/password를 넘기는건 보안상 위험
  - Token
    - 초기에 user/password로 token을 발급받고
    - 이 토큰을 매 API요청에 담아서 보내어 인증을 처리
- Token 모델
  - 유저 모델과 1:1관계
  - 각 유저별로 token은 수동으로 생성해줘야함
  - 토큰만으로 인증을 수행
- Token 생성
  - 방법1
    - ObtainAuthToken 뷰를 통한 획득 및 생성
      - URL Pattern 매핑 필요
  - 방법2
    - Signal을 통한 자동생성
  - 방법3
    - Management 명령을 통한 생성



### JWT 인증

- DRF의 Token

  - 단순한 랜덤 문자열
    - 각 유저와 1:1 매칭
    - 유효기간이 없음

- JWT (Json Web Token)

  - 데이터베이스를 조회하지 않아도, 로직만으로 인증이 가능
  - 포맷 : "헤더.내용.서명"
    - 서버에서 토큰 발급 시에 비밀키로 서명하고, 발급시간을 저장
    - 서명은 암호화가 아님. 누구라도 열어볼 수 있기에 보안성 데이터는 넣지말고 최소한의 정보만 넣기
  - claim : 담는 정보의 한조각. key/value 형식
  - 위변조가 불가
    - 장고에서는 settings.SECRET_KEY를 활용하거나, 별도로 JWT_SECRET_KEY 설정
  - 갱신 매커니즘을 지원
    - 유효기간 내에 갱신하거나, user/password 을 통해 재인증
  - 이미 발급된 Token을 폐기하는 것은 불가

- Token은 안전한 장소에 보관하기

  - 앱은 안전한 저장공간이 있지만, 웹브라우저에는 없음
    - Token은 앱 환경에서만 권장하기도 함
    - 웹 클라이언트 환경에서는 세션 인증이 나은 선택일 수 있음
  - 통신은 필히 https 사용하기

- djangorestframework-jwt

  - 토큰에 대해 생성, 갱신, 확인이 가능

- drf-jwt의 주요 셋팅

  - ```python
    JWT_AUTH = {
      'JWT_SECRET_KEY': settings.SECRET_KEY,
      'JWT_ALGORITHM': 'HS256',
      'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=300),
      'JWT_ALLOW_REFRESH': False,
      'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),
    }
    ```

    