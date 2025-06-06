from django.urls import path
from .views import SignupView,LoginView, GetProfileView, UpdateProfileView, AdminDashboardView, FirebaseLoginView, FirebaseSignupView

# Combine GET and PATCH into a single ProfileView
class ProfileView(GetProfileView, UpdateProfileView):
    pass

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('admin-dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('firebase-login/', FirebaseLoginView.as_view(), name='firebase-login'),
    path('firebase-signup/', FirebaseLoginView.as_view(), name='firebase-signup'),
]