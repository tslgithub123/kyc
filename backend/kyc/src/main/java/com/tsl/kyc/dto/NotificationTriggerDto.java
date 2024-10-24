package com.tsl.kyc.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public class NotificationTriggerDto {
    private UUID fromUserId;
    private UUID toUserId;
    private String type;
    private String message;
    private OffsetDateTime triggerDateTime = OffsetDateTime.now();

    public UUID getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(UUID fromUserId) {
        this.fromUserId = fromUserId;
    }

    public UUID getToUserId() {
        return toUserId;
    }

    public void setToUserId(UUID toUserId) {
        this.toUserId = toUserId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public OffsetDateTime getTriggerDateTime() {
        return triggerDateTime;
    }

    public void setTriggerDateTime(OffsetDateTime triggerDateTime) {
        this.triggerDateTime = triggerDateTime;
    }
}
