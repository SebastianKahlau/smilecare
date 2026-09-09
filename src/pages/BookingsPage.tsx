import { useEffect, useState } from "react";
import type { Booking } from "../types";
import { get, patch } from "../api/api";
import { GenericList } from "../components/GenericList";

export const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = () => {
    get<Booking[]>("/bookings")
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await patch<Booking, { status: "cancelled" }>(`/bookings/${id}`, {
        status: "cancelled",
      });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Alla Bokningar</h2>
      <GenericList
        items={bookings}
        emptyMessage="Inga bokningar gjorda än."
        renderItem={(booking) => {
          // Narrowing på status union-typ
          const isConfirmed = booking.status === "confirmed";

          return (
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "1rem",
                backgroundColor: isConfirmed ? "#f0fdf4" : "#fef2f2",
              }}
            >
              <p>
                <strong>Patient:</strong> {booking.patientEmail}
              </p>
              <p>
                <strong>Behandling:</strong> {booking.procedure}
              </p>
              <p>
                <strong>Tid:</strong>{" "}
                {new Date(booking.startTime).toLocaleString("sv-SE")} -{" "}
                {new Date(booking.endTime).toLocaleTimeString("sv-SE")}
              </p>
              <p>
                <strong>Status: </strong>
                <span
                  style={{
                    color: isConfirmed ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {booking.status === "confirmed" ? "Bekräftad" : "Avbokad"}
                </span>
              </p>
              {isConfirmed && (
                <button
                  onClick={() => handleCancel(booking.id)}
                  style={{
                    backgroundColor: "#fee2e2",
                    border: "1px solid #ef4444",
                    color: "#b91c1c",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Avboka
                </button>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};
