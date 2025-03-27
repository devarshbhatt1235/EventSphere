import React, { useState } from "react";
import { Calendar } from "lucide-react";

export default function BookEvent() {
  const [formData, setFormData] = useState({
    userId: "", // Added userId field for backend
    eventId: "", // Added eventId field for backend
    date: "",
    location: "",
    guestCount: "",
    services: {
      catering: false,
      decoration: false,
      photography: false,
      videography: false,
      music: false,
      transportation: false,
    },
    additionalNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
  ];

  const eventTypes = [
    { id: 1, name: "Wedding" },
    { id: 2, name: "Corporate Event" },
    { id: 3, name: "Birthday Party" },
    { id: 4, name: "Anniversary" },
    { id: 5, name: "Conference" },
    { id: 6, name: "Product Launch" },
    { id: 7, name: "Social Gathering" },
    { id: 8, name: "Religious Event" },
  ];

  const handleServiceChange = (service: string) => {
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        [service]: !formData.services[service as keyof typeof formData.services],
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const selectedServices = Object.keys(formData.services).filter(
      (service) => formData.services[service as keyof typeof formData.services]
    );

    const bookingData = {
      userId: parseInt(formData.userId), // Ensure correct type
      eventId: parseInt(formData.eventId),
      date: formData.date,
      location: formData.location,
      guestCount: parseInt(formData.guestCount),
      services: selectedServices,
      additionalNotes: formData.additionalNotes,
    };

    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setMessage("Booking successful!");
        setFormData({
          userId: "",
          eventId: "",
          date: "",
          location: "",
          guestCount: "",
          services: {
            catering: false,
            decoration: false,
            photography: false,
            videography: false,
            music: false,
            transportation: false,
          },
          additionalNotes: "",
        });
      } else {
        setMessage("Failed to book event. Try again.");
      }
    } catch (error) {
      setMessage("Error occurred while booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-center mb-8">
              <Calendar className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
              Book Your Event
            </h2>

            {message && (
              <p className={`text-center ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User ID & Event ID */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                    User ID
                  </label>
                  <input
                    type="number"
                    id="userId"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="eventId" className="block text-sm font-medium text-gray-700">
                    Event Type
                  </label>
                  <select
                    id="eventId"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.eventId}
                    onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                  >
                    <option value="">Select Event</option>
                    {eventTypes.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <select
                    id="location"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700">
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="guestCount"
                  required
                  min="1"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  id="additionalNotes"
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">
                  {loading ? "Submitting..." : "Submit Booking Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
