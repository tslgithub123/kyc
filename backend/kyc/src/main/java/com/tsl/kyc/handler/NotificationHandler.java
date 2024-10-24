package com.tsl.kyc.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tsl.kyc.entity.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class NotificationHandler extends TextWebSocketHandler {
    private static final Map<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String userId = extractUserId(session);
        if (userId != null) {
            userSessions.put(userId, session);
            System.out.println(("User {} connected"+ userId));
        }
    }

    private String extractUserId(WebSocketSession session) {
        // Extract user ID from session attributes or query parameters
        return session.getUri().getQuery().split("userId=")[1];
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        String userId = extractUserId(session);
        if (userId != null) {
            userSessions.remove(userId);
            System.out.println(("User {} disconnected"+ userId));
        }
    }

    public void sendNotificationToUser(String userId, Notification notification) {
        try {
            String payload = objectMapper.writeValueAsString(notification);
            WebSocketSession session = userSessions.get(userId);
            if (session != null && session.isOpen()) {
                session.sendMessage(new TextMessage(payload));
            }
        } catch (Exception e) {
            System.out.println(("Error sending notification to user: "+ userId + e));
        }
    }

    public void broadcastNotification(Notification notification) {
        try {
            String payload = objectMapper.writeValueAsString(notification);
            userSessions.values().forEach(session -> {
                if (session.isOpen()) {
                    try {
                        session.sendMessage(new TextMessage(payload));
                    } catch (IOException e) {
                        System.out.println(("Error broadcasting message to session: "+ e));
                    }
                }
            });
        } catch (Exception e) {
            System.out.println(("Error broadcasting notification: "+ e));
        }
    }
}