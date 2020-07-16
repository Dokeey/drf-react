from django.urls import path, re_path, register_converter

from .converters import YearConverter, MonthConverter, DayConverter
from . import views

app_name = 'instagram'  # URL Reverse에서 namespace 역할


register_converter(YearConverter, 'year')
register_converter(MonthConverter, 'month')
register_converter(DayConverter, 'day')

urlpatterns = [
    path('new/', views.post_new, name='post_new'),
    path('edit/<int:pk>/', views.post_edit, name='post_edit'),

    path('', views.post_list, name='post_list'),
    path('<int:pk>/', views.post_detail, name='post_detail'),
    # re_path(r'archives/(?P<year>20\d{2})', views.archives_year),
    # path('archives/<year:year>/', views.archives_year),
    path('archive/', views.post_archive, name='post_archive'),
    path('archive/<year:year>/', views.post_archive_year, name='post_archive_year'),
    # path('archive/<year:year>/<month:month>/', views.post_archive_year, name='post_archive_year'),
    # path('archive/<year:year>/<month:month>/<day:day>/', views.post_archive_year, name='post_archive_year'),
]
