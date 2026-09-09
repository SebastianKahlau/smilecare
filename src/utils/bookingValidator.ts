import type { Booking, NewBooking } from "../types";

export function isOverlapping(
  newBooking: NewBooking,
  existingBookings: Booking[],
): boolean {
  // Early return / narrowing mot undefined & tomma värden
  if (!newBooking.startTime || !newBooking.endTime || !newBooking.roomId) {
    return false;
  }

  const newStart = new Date(newBooking.startTime).getTime();
  const newEnd = new Date(newBooking.endTime).getTime();

  // Filtrera på samma rum och endast bekräftade bokningar
  const roomBookings = existingBookings.filter(
    (b) => b.roomId === newBooking.roomId && b.status === "confirmed",
  );

  return roomBookings.some((booking) => {
    const existingStart = new Date(booking.startTime).getTime();
    const existingEnd = new Date(booking.endTime).getTime();

    // Överlappningslogik: StartA < SlutB OCH SlutA > StartB
    return newStart < existingEnd && newEnd > existingStart;
  });
}
