import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useWebSocketConnection from './useWebSocket';
import useNotifications from './useNotifications';
import { fetchNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '../services/notificationsService';

const useAdminNotifications = () => {
  const user = useSelector((state) => state.auth.user);
  const WS_URL = import.meta.env.VITE_WS_URL;
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if user should connect
  const shouldConnect = user && user.role === 'Admin';
  const websocketUrl = shouldConnect ? `${WS_URL}/notifications/` : null;

  // Use composed hooks
  const { isConnected, addMessageHandler, removeMessageHandler } = 
    useWebSocketConnection(websocketUrl, shouldConnect);
  
  const notificationHook = useNotifications();

  const loadNotificationsFromDB = useCallback(async () => {
    if (!shouldConnect) return;
    
    setIsLoading(true);
    try {
      const result = await fetchNotifications();

      if (result && result.success && Array.isArray(result.notifications)) {
        notificationHook.loadNotifications(result.notifications);
      } else {
        console.error('Failed to fetch notifications:', result?.error || 'Unknown error');
        // Set empty array if fetch fails
        notificationHook.loadNotifications([]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Set empty array on error
      notificationHook.loadNotifications([]);
    } finally {
      setIsLoading(false);
    }
  }, [shouldConnect, notificationHook]);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      // Update local state immediately for better UX
      notificationHook.markAsRead(notificationId);
      
      // Sync with database using service
      const result = await markNotificationAsRead(notificationId);
            
      if (!result || !result.success) {
        console.error('Failed to mark notification as read in database:', result?.error || 'Unknown error');
        // Could implement rollback here if needed
      } 
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, [notificationHook]);

  // ✅ Enhanced mark all as read with database sync using service
  const markAllAsRead = useCallback(async () => {
    try {
      // Update local state immediately for better UX
      notificationHook.markAllAsRead();
      
      // Sync with database using service
      const result = await markAllNotificationsAsRead();
      
      
      if (!result || !result.success) {
        console.error('Failed to mark all notifications as read in database:', result?.error || 'Unknown error');
      } 
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }, [notificationHook]);

  const handleWebSocketMessage = useCallback((event) => {
    // ✅ Double-check user is still admin when receiving messages
    if (!user || user.role !== 'Admin') {
      console.log('❌ Ignoring notification - user not admin');
      return;
    }
    
    try {
      const data = JSON.parse(event.data);
      
      if (data.type === 'notification') {
        notificationHook.addNotification(data.data);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }, [notificationHook, user]);

  // ✅ Fetch notifications when component mounts or user changes
  useEffect(() => {
    if (shouldConnect) {
      loadNotificationsFromDB();
    }
  }, [shouldConnect, loadNotificationsFromDB]);

  // Register message handler
  useEffect(() => {
    if (shouldConnect) {
      addMessageHandler(handleWebSocketMessage);
      
      return () => {
        removeMessageHandler(handleWebSocketMessage);
      };
    }
  }, [shouldConnect, handleWebSocketMessage, addMessageHandler, removeMessageHandler]);

  return {
    ...notificationHook,
    isConnected,
    isLoading,
    markAsRead, 
    markAllAsRead, 
    refreshNotifications: loadNotificationsFromDB
  };
};

export default useAdminNotifications;