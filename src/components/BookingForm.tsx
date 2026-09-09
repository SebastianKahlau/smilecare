import React, { useState } from "react";
import type { NewBooking } from "../types";

interface BookingFormProps {
  roomId: string;
  onBook: (booking: NewBooking) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ roomId, onBook }) => {
  const [email, setEmail] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [procedure, setProcedure] = useState("Årlig kontroll");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !startTime || !endTime) {
      setValidationError("Alla fält måste fyllas i.");
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      setValidationError("Sluttiden måste vara efter starttiden.");
      return;
    }

    setValidationError(null);

    const bookingPayload: NewBooking = {
      roomId,
      patientEmail: email,
      startTime,
      endTime,
      procedure,
      status: "confirmed",
    };

    onBook(bookingPayload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        padding: "1.2rem",
        borderRadius: "8px",
        marginTop: "1rem",
      }}
    >
      <h4>Boka tid i detta rum</h4>
      {validationError && <p style={{ color: "red" }}>{validationError}</p>}

      <div style={{ marginBottom: "0.8rem" }}>
        <label style={{ display: "block" }}>E-postadress:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "0.4rem" }}
        />
      </div>

      <div style={{ marginBottom: "0.8rem" }}>
        <label style={{ display: "block" }}>Starttid:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          style={{ width: "100%", padding: "0.4rem" }}
        />
      </div>

      <div style={{ marginBottom: "0.8rem" }}>
        <label style={{ display: "block" }}>Sluttid:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          style={{ width: "100%", padding: "0.4rem" }}
        />
      </div>

      <div style={{ marginBottom: "0.8rem" }}>
        <label style={{ display: "block" }}>Behandling:</label>
        <select
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
          style={{ width: "100%", padding: "0.4rem" }}
        >
          <option value="Årlig kontroll">Årlig kontroll</option>
          <option value="Lagning av tand">Lagning av tand</option>
          <option value="Tandstensborttagning">Tandstensborttagning</option>
        </select>
      </div>

      <button
        type="submit"
        style={{ padding: "0.6rem 1.2rem", cursor: "pointer" }}
      >
        Bekräfta bokning
      </button>
    </form>
  );
};
