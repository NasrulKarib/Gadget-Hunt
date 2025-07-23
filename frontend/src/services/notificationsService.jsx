import { api } from './BaseAPI'

export const fetchNotifications = async () => {
    try {
        const response = await api.get('/api/notifications/');
        
        
        // ✅ Handle the structured response from backend
        if (response.data.success && response.data.notifications) {
            const transformedNotifications = response.data.notifications.map(notification => ({
                id: notification.id,
                title: notification.title,
                message: notification.message,
                type: notification.type,
                read: notification.read,
                timestamp: notification.timestamp,
                related_object_id: notification.related_object_id
            }));

            return {
                success: true,
                notifications: transformedNotifications,
                count: response.data.count
            };
        } else {
            return {
                success: false,
                error: response.data.error || 'Invalid response format'
            };
        }

    } catch (error) {
        console.error('Error fetching notifications:', error);
        return { 
            success: false,
            error: error.response?.data?.error || error.message || 'Network error' 
        };
    }
}

export const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await api.patch(`/api/notifications/mark-read/${notificationId}/`)
        
                    
        return {
            success: response.data.success || true,
            message: response.data.message
        };
    } catch (error) {
        console.error('Error marking notification as read:', error);
        return { 
            success: false,
            error: error.response?.data?.error || error.message || 'Network error' 
        };
    }
}

export const markAllNotificationsAsRead = async () => {
    try {
        const response = await api.patch('/api/notifications/mark-all-read/')
        
        
        return {
            success: response.data.success || true,
            message: response.data.message
        };
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        return { 
            success: false,
            error: error.response?.data?.error || error.message || 'Network error' 
        };
    }
}