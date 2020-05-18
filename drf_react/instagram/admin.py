from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
  list_display = ['id', 'photo_tag', 'message', 'message_length', 'is_public', 'created_at']
  list_display_links = ['id', 'message']
  search_fields = ['message']
  list_filter = ['is_public', 'created_at']

  # def message_length(self, post):
  #     return len(post.message)
  # message_length.short_description = '메세지 글자수'

  def photo_tag(self, post):
    if post.photo:
      return mark_safe(f'<img src="{post.photo.url}" style="width:72px" />')
    return None