import { useState, useEffect, useRef, useCallback } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const useWebSocketConnection = (url, shouldConnect = true) => {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  const messageHandlers = useRef([]);

  const connect = useCallback(() => {


    if (!shouldConnect || !url) return;

    try {
      ws.current = new ReconnectingWebSocket(url);
      
      ws.current.onopen = () => {
        console.log('🔗 WebSocket connected');
        setIsConnected(true);
      };

      ws.current.onmessage = (event) => {
        console.log('📨 Raw WebSocket message:', event.data);
        messageHandlers.current.forEach(handler => handler(event));
      };

      ws.current.onclose = (event) => {
        console.log('🔌 WebSocket disconnected. Code:', event.code, 'Reason:', event.reason);
        setIsConnected(false);
      };

      ws.current.onerror = (error) => {
        console.error('🚨 WebSocket error:', error);
        setIsConnected(false);
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
    }
  }, [url, shouldConnect]);

  const disconnect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
      setIsConnected(false);
    }
  }, []);

  const addMessageHandler = useCallback((handler) => {
    messageHandlers.current.push(handler);
  }, []);

  const removeMessageHandler = useCallback((handler) => {
    messageHandlers.current = messageHandlers.current.filter(h => h !== handler);
  }, []);

  useEffect(() => {
    if (shouldConnect) {
      connect();
    } else {
      disconnect();
    }

    return () => disconnect();
  }, [shouldConnect, connect, disconnect]);

  return {
    isConnected,
    addMessageHandler,
    removeMessageHandler,
    connect,
    disconnect
  };
};

export default useWebSocketConnection;