from django.urls import path
from .views import SignupView,LoginView, GetProfileView, AdminDashboardView, FirebaseLoginView, FirebaseSignupView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', GetProfileView.as_view(), name='get-profile'),
    path('admin-dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('firebase-login/', FirebaseLoginView.as_view(), name='firebase-login'),
    path('firebase-signup/', FirebaseLoginView.as_view(), name='firebase-signup'),
]