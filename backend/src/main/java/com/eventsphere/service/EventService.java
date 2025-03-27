package com.eventsphere.service;

import com.eventsphere.dto.EventDTO;
import com.eventsphere.entity.Event;
import com.eventsphere.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }
    
    public Event createEvent(EventDTO eventDTO) {
        Event event = new Event();
        event.setTitle(eventDTO.getTitle());
        event.setDescription(eventDTO.getDescription());
        event.setLocation(eventDTO.getLocation());
        event.setDate(eventDTO.getDate());
        event.setPrice(eventDTO.getPrice());
        event.setImage(eventDTO.getImage());
        event.setCategory(eventDTO.getCategory());
        event.setCapacity(eventDTO.getCapacity());
        
        return eventRepository.save(event);
    }


}