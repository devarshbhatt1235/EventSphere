package com.eventsphere.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.Set;

@Data
public class BookingDTO {

    private Long userId;
    private Long eventId;
    private LocalDate date; // Changed to LocalDate for consistency
    private Integer guestCount;
    private Set<String> services;
    private String status;
    private String location;
    private String additionalNotes;

    public BookingDTO() {
    }

    public BookingDTO(Long userId, Long eventId, LocalDate date, Integer guestCount, Set<String> services, String status, String location, String additionalNotes) {
        this.userId = userId;
        this.eventId = eventId;
        this.date = date;
        this.guestCount = guestCount;
        this.services = services;
        this.status = status;
        this.location = location;
        this.additionalNotes = additionalNotes;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getGuestCount() {
        return guestCount;
    }

    public void setGuestCount(Integer guestCount) {
        this.guestCount = guestCount;
    }

    public Set<String> getServices() {
        return services;
    }

    public void setServices(Set<String> services) {
        this.services = services;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }
}
