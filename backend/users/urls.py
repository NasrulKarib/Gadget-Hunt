from django.urls import path
from .views import SignupView,LoginView, UserProfileView, AdminDashboardView, ValidateToken, FirebaseLoginView, FirebaseSignupView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('admin-dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('validate-token/', ValidateToken.as_view(), name='validate-token'),
    path('firebase-login/', FirebaseLoginView.as_view(), name='firebase-login'),
    path('firebase-signup/', FirebaseLoginView.as_view(), name='firebase-signup'),
]