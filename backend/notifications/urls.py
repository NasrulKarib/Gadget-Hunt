from django.urls import path
from .views import NotificationView, MarkNotificationReadView, MarkAllNotificationsReadView

urlpatterns = [
    path('', NotificationView.as_view(), name='notification-list'),
    path('mark-read/<int:notification_id>/', MarkNotificationReadView.as_view(), name='mark-notification-read'),
    path('mark-all-read/', MarkAllNotificationsReadView.as_view(), name='mark-all-notifications-read')
]