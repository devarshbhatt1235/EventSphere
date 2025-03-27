import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

interface Booking {
  id: number;
  event: { title: string };
  date: string;
  location: string;
  guestCount: number;
  services: string[];
  status: string;
  price: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = 4; // ✅ Replace with actual user ID
  const API_URL = `http://localhost:8080/api/bookings/user/${userId}`; // ✅ Ensure correct backend URL

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
           
            "Content-Type": "application/json",
          },
        });

        // ✅ Debug response
        console.log("Raw Response:", response);

        // ✅ Check if response is HTML (potential error page)
        const contentType = response.headers.get("content-type");
        if (!response.ok) {
          const errorMessage = contentType?.includes("application/json")
            ? await response.json()
            : await response.text(); // Read error message
          throw new Error(`Error ${response.status}: ${errorMessage}`);
        }

        // ✅ Ensure JSON response
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format (Not JSON)");
        }

        const data = await response.json();
        console.log("Fetched bookings:", data);
        setBookings(data);
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [API_URL]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found.");

      const deleteResponse = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!deleteResponse.ok) {
        throw new Error(`Failed to delete booking: ${deleteResponse.status}`);
      }

      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (err: any) {
      console.error("Error deleting booking:", err);
      alert("Error deleting booking. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading bookings...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-lg text-gray-600">Manage your event bookings</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No bookings found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{booking.event.title}</h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-gray-600">Date: {booking.date}</p>
                      <p className="text-gray-600">Location: {booking.location}</p>
                      <p className="text-gray-600">Guests: {booking.guestCount}</p>
                    </div>
                    
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">{booking.price}</span>
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="inline-flex items-center px-4 py-2 border border-red-600 rounded-md text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </button>
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
