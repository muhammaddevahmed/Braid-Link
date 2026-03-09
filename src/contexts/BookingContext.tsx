import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { bookings as initialBookings, Booking } from "@/data/demo-data";
import { useAuth } from "./AuthContext";

type BookingStatus = "pending-approval" | "approved" | "upcoming" | "completed" | "cancelled" | "rejected";

interface BookingContextType {
  bookings: Booking[];
  createBooking: (bookingData: Omit<Booking, "id" | "status">) => boolean;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  getStylistBookings: (stylistId: string) => Booking[];
  getCustomerBookings: (customerId: string) => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const savedBookings = localStorage.getItem("braidbook_bookings");
      return savedBookings ? JSON.parse(savedBookings) : initialBookings;
    } catch (error) {
      console.error("Failed to parse bookings from localStorage", error);
      return initialBookings;
    }
  });

  useEffect(() => {
    localStorage.setItem("braidbook_bookings", JSON.stringify(bookings));
  }, [bookings]);

  const createBooking = (bookingData: Omit<Booking, "id" | "status">): boolean => {
    const newBooking: Booking = {
      ...bookingData,
      id: `new_${Date.now()}`,
      status: "pending-approval",
    };
    setBookings(prev => [...prev, newBooking]);
    return true;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, status } : b)
    );
  };
  
  const getStylistBookings = (stylistId: string) => {
    return bookings.filter(b => b.stylistId === stylistId);
  };

  const getCustomerBookings = (customerId: string) => {
    return bookings.filter(b => b.customerId === customerId);
  };

  return (
    <BookingContext.Provider value={{ bookings, createBooking, updateBookingStatus, getStylistBookings, getCustomerBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
