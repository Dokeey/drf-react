# DRF-React Study

## Chapter 2. 장고 Models

### 장고 쉘

- 용도
  - 장고 모델의 분석, 크롤링 등 용도
- IPython, 쥬피터 노트북 추천

### 모델을 통한 조회(기초)

- 모델매니저
  - 정렬
  - 슬라이스
  - 실제 쿼리는 최대한 Lazy하게 동작함.
    - 데이터가 필요한 시점에만 DB에 접근
      - 쿼리셋
      - 출력할때
      - 리스트 변환시
      - 루프 순환시

- Chaning을 지원
  - 쿼리셋은 lazy 하기 때문에 계속 이어서 만들 수 있음

- 다양한 조회요청 방법
  - 쿼리셋, 획득할 준비
    - filter
    - exclude
  - 특정 모델객체 1개 획득 시도
    - queryset[숫자인덱스]
    - queryset.get(...)
    - queryset.first()
    - queryset.last()
  - 인자 갯수는 전부 and 조건
    - qs.filter(id_gte=2, message__icontains=query)
  - or 조건은 Q객체 활용
    - qs.filter(Q(id_gte=2) | Q(message__icontains=query))

### Queryset을 통한 간단 검색 구현

- 코드 참조