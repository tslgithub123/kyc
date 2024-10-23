import { useState, useEffect, useCallback } from 'react';

const RECONNECT_INTERVAL = 5000;

interface WebSocketHookProps {
  userId: string;
  onMessage: (notification: Notification) => void;
}
export interface Notification {
    id: string;
    userId: string;
    message: string;
    notificationType: string;
    triggerDate: string;
  }

export const useWebSocket = ({ userId, onMessage }: WebSocketHookProps) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);

  const connect = useCallback(() => {
    const socket = new WebSocket(`ws://192.168.1.33:8080/notifications?userId=${userId}`);
    socket.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
      setReconnectAttempt(0);
    };

    socket.onmessage = (event) => {
      try {
        const notification: Notification = JSON.parse(event.data);
        onMessage(notification);
      } catch (error) {
        console.error('Error parsing notification:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      setWs(null);

    //   // Attempt to reconnect
    //   setTimeout(() => {
    //     setReconnectAttempt((prev) => prev + 1);
    //   }, RECONNECT_INTERVAL);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(socket);
  }, [userId, onMessage]);

  useEffect(() => {
    connect();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return { isConnected };
};
