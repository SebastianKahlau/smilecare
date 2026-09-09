export type BookingStatus = "confirmed" | "cancelled";
export type RoomSpecialty = "general-dentistry" | "hygienist" | "surgery";

// 1. Bokningsbar resurs
export interface TreatmentRoom {
  id: string;
  name: string;
  dentistName: string;
  specialty: RoomSpecialty;
  capacity: number;
}

// 2. Bokning av resurs
export interface Booking {
  id: string;
  roomId: string;
  patientEmail: string;
  startTime: string;
  endTime: string;
  procedure: string;
  status: BookingStatus;
}

// Utility type för ny bokning innan backend satt id (G-krav)
export type NewBooking = Omit<Booking, "id">;
