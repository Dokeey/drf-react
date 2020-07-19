# DRF-React Study

## Chapter 5. 장고 Forms

### Messages Framework

- Messages Framework

  - 현재 User를 위한 1회성 메세지
  - HttpRequest 인스턴스를 통해 메시지를 남김
    - View 에서만 사용 가능
  - JS로도 사용가능

- 레벨

  - DEBUG
  - INFO
  - SUCCESS
  - WARNING
  - ERROR

- 출력 tags 변경하기

  > settings.py

  ```python
  from django.contrib.messages import constants
  
  MESSAGE_TAGS = {
    constants.DEBUG: 'secondary',
    constants.ERROR: 'danger',
  }
  ```

- Messages 소모하기

  > layout.html

  ```django
  {% if messages %}
    {% for message in messages %}
      <div class="alert alert-{{ message.tags }}">
        {{ message.message }}
      </div>
    {% endfor %}
  {% endif %}
  ```

  

### built-in CBV를 통한 Form 처리

- Built-in CBV API
  - FormView, CreateView, UpdateView, DeleteView