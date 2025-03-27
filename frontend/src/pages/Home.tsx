import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, Camera, Music, Utensils, MapPin } from "lucide-react";

// Define event type
interface Event {
  id: number;
  title: string;
  image: string;
  location: string;
  price: string;
}

// Define services
const services = [
  { icon: <Calendar className="h-8 w-8" />, name: "Event Planning", description: "Comprehensive event planning and coordination" },
  { icon: <Utensils className="h-8 w-8" />, name: "Catering", description: "Exquisite culinary experiences" },
  { icon: <Camera className="h-8 w-8" />, name: "Photography", description: "Professional photo and video coverage" },
  { icon: <Music className="h-8 w-8" />, name: "Entertainment", description: "Live music and entertainment options" },
  { icon: <MapPin className="h-8 w-8" />, name: "Venue Selection", description: "Perfect venues across India" },
  { icon: <Users className="h-8 w-8" />, name: "Guest Management", description: "Complete guest list coordination" },
];

export default function Home() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data.slice(0, 3))) // Show only the first 3 events
      .catch(() => setError("Failed to load events"));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Create Unforgettable Moments with EventSphere</h1>
            <p className="text-xl mb-8">Your premier event planning partner across India</p>
            <Link to="/book" className="bg-purple-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-700">
              Plan Your Event
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-purple-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Events</h2>

          {error && <p className="text-red-600 text-center">{error}</p>}
          {!events && !error && <p className="text-center text-gray-600">Loading events...</p>}

          {events && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-2">
                      <MapPin className="inline-block h-4 w-4 mr-1" />
                      {event.location}
                    </p>
                    <p className="text-purple-600 font-semibold">Starting from {event.price}</p>
                    <Link
                      to="/book"
                      className="mt-4 block text-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
