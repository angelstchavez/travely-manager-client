import React, { useEffect, useState } from "react";
import Seat from "./seat";
import Cookies from "js-cookie";

interface Seat {
  id: string;
  number: number;
  status: "Disponible" | "Reservado" | "Vendido";
  tripId: number;
}

interface BusProps {
  tripId: number;
}

const Bus: React.FC<BusProps> = ({ tripId }) => {
  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData = JSON.parse(cookieValue);
        const token = cookieData?.data?.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `http://localhost:90/api/v1/seat/get-by-trip/${tripId}`, // Se utiliza tripId en la URL del endpoint
          {
            method: "GET",
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSeats(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tripId]);

  const thirdLength = Math.ceil(seats.length / 4);
  const firstThird = seats.slice(0, thirdLength);
  const secondThird = seats.slice(thirdLength, thirdLength * 2);
  const thirdSection = seats.slice(thirdLength * 2, thirdLength * 3);
  const fourthSection = seats.slice(thirdLength * 3);

  // ...

  return (
    <div className="grid grid-cols-5 gap-3 border rounded p-2">
      {/* Columna 1 */}
      <div className="col-span-1">
        {firstThird.map((seat, index) => (
          <div
            key={seat.id}
            className={`mb-2 ${index !== firstThird.length - 1 ? "mb-2" : ""}`}
          >
            <Seat
              id={seat.id}
              number={seat.number}
              status={seat.status}
            />
          </div>
        ))}
      </div>
      {/* Columna 2 */}
      <div className="col-span-1">
        {secondThird.map((seat, index) => (
          <div
            key={seat.id}
            className={`mb-2 ${index !== secondThird.length - 1 ? "mb-2" : ""}`}
          >
            <Seat
              id={seat.id}
              number={seat.number}
              status={seat.status}
            />
          </div>
        ))}
      </div>
      {/* Columna 3 (vacía) */}
      <div className="col-span-1 bg-zinc-100 rounded-md mb-2"></div>
      {/* Columna 4 */}
      <div className="col-span-1">
        {thirdSection.map((seat, index) => (
          <div
            key={seat.id}
            className={`mb-2 ${
              index !== thirdSection.length - 1 ? "mb-2" : ""
            }`}
          >
            <Seat
              id={seat.id}
              number={seat.number}
              status={seat.status}
            />
          </div>
        ))}
      </div>
      {/* Columna 5 */}
      <div className="col-span-1">
        {fourthSection.map((seat, index) => (
          <div
            key={seat.id}
            className={`mb-2 ${
              index !== fourthSection.length - 1 ? "mb-2" : ""
            }`}
          >
            <Seat
              id={seat.id}
              number={seat.number}
              status={seat.status}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bus;
