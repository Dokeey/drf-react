from django.urls import path, re_path, register_converter

from . import views

app_name = 'instagram'  # URL Reverse에서 namespace 역할


class YearConverter:
    regex = r"20\d{2}"

    def to_python(self, value):
        return int(value)

    def to_url(self, value):
        return "%04d" % value


register_converter(YearConverter, 'year')

urlpatterns = [
    path('', views.post_list),
    path('<int:pk>/', views.post_detail),
    # re_path(r'archives/(?P<year>20\d{2})', views.archives_year),
    path('archives/<year:year>/', views.archives_year),
]
