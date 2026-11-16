import "./Reservation.css";
import { useState } from "react";

function Reservation() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState("2");
    const [reserved, setReserved] = useState(false);

    function makeReservation(event) {
        event.preventDefault();
        setReserved(true);
    }

    return (
        <div className="reservation">
            <h1>Reserve a Table</h1>

            <form onSubmit={makeReservation}>
                <label>Your Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />

                <label>Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                />

                <label>Time</label>
                <input
                    type="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    required
                />

                <label>Number of Guests</label>
                <select
                    value={guests}
                    onChange={(event) => setGuests(event.target.value)}
                >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                </select>

                <button type="submit">Book Table</button>
            </form>

            {reserved && (
                <div>
                    <h2>Reservation Confirmed!</h2>
                    <p>Name: {name}</p>
                    <p>Date: {date}</p>
                    <p>Time: {time}</p>
                    <p>Guests: {guests}</p>
                </div>
            )}
        </div>
    );
}

export default Reservation;
