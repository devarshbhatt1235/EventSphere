export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  price: number;
  image: string;
  category: string;
}

export interface User {
  email: string;
  password: string;
}

export interface EventBookingForm {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  location: string;
  guestCount: number;
  services: {
    catering: boolean;
    decoration: boolean;
    photography: boolean;
    videography: boolean;
    music: boolean;
    transportation: boolean;
  };
  additionalNotes: string;
}