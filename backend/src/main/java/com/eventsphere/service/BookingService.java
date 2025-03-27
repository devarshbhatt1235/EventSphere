package com.eventsphere.service;

import com.eventsphere.dto.BookingDTO;
import com.eventsphere.entity.Booking;
import com.eventsphere.entity.Event;
import com.eventsphere.entity.User;
import com.eventsphere.repository.BookingRepository;
import com.eventsphere.repository.EventRepository;
import com.eventsphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EventRepository eventRepository;
    
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    public Booking createBooking(BookingDTO bookingDTO) {
        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Event event = eventRepository.findById(bookingDTO.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));
        
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setEvent(event);
        booking.setDate(bookingDTO.getDate());
        booking.setGuestCount(bookingDTO.getGuestCount());
        booking.setServices(bookingDTO.getServices());
        booking.setStatus("pending");
        booking.setLocation(bookingDTO.getLocation());
        booking.setAdditionalNotes(bookingDTO.getAdditionalNotes());
        
        return bookingRepository.save(booking);
    }
    
    public Booking updateBooking(Long id, BookingDTO bookingDTO) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setDate(bookingDTO.getDate());
        booking.setGuestCount(bookingDTO.getGuestCount());
        booking.setServices(bookingDTO.getServices());
        booking.setLocation(bookingDTO.getLocation());
        booking.setAdditionalNotes(bookingDTO.getAdditionalNotes());
        
        return bookingRepository.save(booking);
    }
    
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}