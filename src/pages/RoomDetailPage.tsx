import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import type { TreatmentRoom, Booking, NewBooking } from "../types";
import { get, post } from "../api/api";
import { BookingForm } from "../components/BookingForm";
import { isOverlapping } from "../utils/bookingValidator";

export const RoomDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<TreatmentRoom | null>(null);
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    get<TreatmentRoom>(`/rooms/${id}`)
      .then((data) => setRoom(data))
      .catch((err) => console.error(err));

    get<Booking[]>(`/bookings?roomId=${id}`)
      .then((data) => setExistingBookings(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleBookingSubmit = async (newBooking: NewBooking) => {
    if (isOverlapping(newBooking, existingBookings)) {
      setMessage("❌ Tyvärr är denna tid redan upptagen för detta rum!");
      return;
    }

    try {
      const savedBooking = await post<Booking, NewBooking>(
        "/bookings",
        newBooking,
      );
      setExistingBookings((prev) => [...prev, savedBooking]);
      setMessage("✅ Bokningen lyckades!");
    } catch {
      setMessage("Ett fel uppstod när bokningen skulle sparas.");
    }
  };

  if (!room) return <p>Laddar rum...</p>;

  return (
    <div>
      <Link to="/" style={{ color: "#555" }}>
        ← Tillbaka till alla rum
      </Link>
      <h2 style={{ marginTop: "1rem" }}>{room.name}</h2>
      <p>
        <strong>Ansvarig:</strong> {room.dentistName} ({room.specialty})
      </p>

      {message && (
        <div
          style={{
            padding: "0.8rem",
            background: "#eee",
            margin: "1rem 0",
            borderRadius: "4px",
          }}
        >
          {message}
        </div>
      )}

      <BookingForm roomId={room.id} onBook={handleBookingSubmit} />
    </div>
  );
};
