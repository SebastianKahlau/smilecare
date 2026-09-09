import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { TreatmentRoom } from "../types";
import { get } from "../api/api";
import { GenericList } from "../components/GenericList";

export const RoomsPage = () => {
  const [rooms, setRooms] = useState<TreatmentRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get<TreatmentRoom[]>("/rooms")
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Hämtar behandlingsrum...</p>;

  return (
    <div>
      <h2>Våra Behandlingsrum</h2>
      <GenericList
        items={rooms}
        renderItem={(room) => (
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "1rem",
              backgroundColor: "#fafafa",
            }}
          >
            <h3>{room.name}</h3>
            <p>
              <strong>Läkare/Hygienist:</strong> {room.dentistName}
            </p>
            <p>
              <strong>Specialitet:</strong> {room.specialty}
            </p>
            <Link
              to={`/rooms/${room.id}`}
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                color: "#0066cc",
              }}
            >
              Boka tid i detta rum →
            </Link>
          </div>
        )}
      />
    </div>
  );
};
