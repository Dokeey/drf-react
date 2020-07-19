# DRF-React Study

## Chapter 6. 장고 기본 인증 구현하기

### 로그인 처리

- 장고 기본 제공기능 사용하기

  - ```python
    from django.contrib.auth.views import LoginView
    from django.urls import path
    
    
    urlpatterns = [
        path('login/', LoginView.as_view(template_name='accounts/login_form.html'), name='login'),
    ]
    ```

### 사용자 프로필 페이지 및 프로필 수정

- accounts/views.py

  - ```python
    from django.contrib.auth.decorators import login_required
    from django.contrib.auth.mixins import LoginRequiredMixin
    from django.shortcuts import render, redirect
    
    from .forms import ProfileForm
    from .models import Profile
    
    # Create your views here.
    
    # @login_required
    # def profile(request):
    #     return render(request, 'accounts/profile.html')
    
    from django.views.generic import TemplateView, UpdateView
    
    
    class ProfileView(LoginRequiredMixin, TemplateView):
        template_name = 'accounts/profile.html'
    
    
    profile = ProfileView.as_view()
    
    
    @login_required
    def profile_edit(request):
        try:
            profile = request.user.profile
        except:
            profile = None
    
        if request.method == 'POST':
            form = ProfileForm(request.POST, request.FILES, instance=profile)
            if form.is_valid():
                profile = form.save(commit=False)
                profile.user = request.user
                profile.save()
                return redirect('profile')
        else:
            form = ProfileForm(instance=profile)
    
        return render(request, 'accounts/profile_form.html', {
            'form': form
        })
    ```

