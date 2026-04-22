import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { bookings as initialBookings, Booking } from "@/data/demo-data";
import { useAuth } from "./AuthContext";

type BookingStatus = "pending-approval" | "approved" | "upcoming" | "completed" | "cancelled" | "rejected" | "reschedule-requested";

export interface RejectedInstantMatch {
  bookingId: string;
  customerId: string;
  searchCriteria: {
    hairstyle: string;
    date: string;
    time: string;
    minPrice: number;
    maxPrice: number;
  };
  rejectedStylistIds: string[];
}

interface BookingContextType {
  bookings: Booking[];
  createBooking: (bookingData: Omit<Booking, "id" | "status">) => boolean;
  updateBookingStatus: (bookingId: string, status: BookingStatus, searchCriteria?: RejectedInstantMatch["searchCriteria"]) => void;
  requestReschedule: (bookingId: string, newDate: string, newTime: string) => void;
  getStylistBookings: (stylistId: string) => Booking[];
  getCustomerBookings: (customerId:string) => Booking[];
  getRejectedInstantMatchForCustomer: (customerId: string) => RejectedInstantMatch | null;
  clearRejectedInstantMatch: (bookingId: string) => void;
}

export const BookingContext = createContext<BookingContextType | undefined>(undefined);

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

  const [rejectedInstantMatches, setRejectedInstantMatches] = useState<RejectedInstantMatch[]>(() => {
    try {
      const saved = localStorage.getItem("braidbook_rejected_instant_matches");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse rejected instant matches", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("braidbook_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("braidbook_rejected_instant_matches", JSON.stringify(rejectedInstantMatches));
  }, [rejectedInstantMatches]);

  const createBooking = (bookingData: Omit<Booking, "id" | "status">): boolean => {
    const newBooking: Booking = {
      ...bookingData,
      id: `new_${Date.now()}`,
      status: "pending-approval",
    };
    setBookings(prev => [...prev, newBooking]);
    return true;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus, searchCriteria?: RejectedInstantMatch["searchCriteria"]) => {
    setBookings(prev => {
      const booking = prev.find(b => b.id === bookingId);
      
      // If a booking is rejected and it's from instant match, save the rejection
      if (status === "rejected" && booking) {
        // Use searchCriteria from parameter first, then from booking if available
        const criteria = searchCriteria || booking.searchCriteria;
        
        if (criteria && booking.bookingType === "instant-match") {
          const existingRejection = rejectedInstantMatches.find(r => r.customerId === booking.customerId);
          
          if (existingRejection) {
            // Update existing rejection with new stylist
            setRejectedInstantMatches(prev =>
              prev.map(r =>
                r.customerId === booking.customerId
                  ? { ...r, rejectedStylistIds: [...r.rejectedStylistIds, booking.stylistId] }
                  : r
              )
            );
          } else {
            // Create new rejection record
            setRejectedInstantMatches(prev => [
              ...prev,
              {
                bookingId,
                customerId: booking.customerId,
                searchCriteria: {
                  hairstyle: criteria.hairstyle,
                  date: booking.date,
                  time: booking.time,
                  minPrice: criteria.minPrice,
                  maxPrice: criteria.maxPrice,
                },
                rejectedStylistIds: [booking.stylistId],
              }
            ]);
          }
        }
      }

      return prev.map(b => b.id === bookingId ? { ...b, status } : b);
    });
  };

  const requestReschedule = (bookingId: string, newDate: string, newTime: string) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              status: "reschedule-requested",
              rescheduleDate: newDate,
              rescheduleTime: newTime,
            }
          : b
      )
    );
  };
  
  const getStylistBookings = (stylistId: string) => {
    return bookings.filter(b => b.stylistId === stylistId);
  };

  const getCustomerBookings = (customerId: string) => {
    return bookings.filter(b => b.customerId === customerId);
  };

  const getRejectedInstantMatchForCustomer = (customerId: string): RejectedInstantMatch | null => {
    return rejectedInstantMatches.find(r => r.customerId === customerId) || null;
  };

  const clearRejectedInstantMatch = (bookingId: string) => {
    setRejectedInstantMatches(prev => prev.filter(r => r.bookingId !== bookingId));
  };

  return (
    <BookingContext.Provider value={{ bookings, createBooking, updateBookingStatus, requestReschedule, getStylistBookings, getCustomerBookings, getRejectedInstantMatchForCustomer, clearRejectedInstantMatch }}>
      {children}
    </BookingContext.Provider>
  );
};
