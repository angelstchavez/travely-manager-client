import React, { useEffect, useState } from "react";
import Seat from "./seat";
import Cookies from "js-cookie";

interface Seat {
  id: string;
  number: number;
  status: "Libre" | "Reservado" | "Vendido";
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
  }, [tripId]); // Agregar tripId como dependencia para que useEffect se ejecute cuando cambie

  return (
    <div className="grid grid-cols-5 gap-2 border rounded p-2">
      {seats.map((seat, index) => (
        <React.Fragment key={seat.id}>
          {(index + 1) % 5 === 3 ? ( // Si es el tercer elemento en una fila (columna 3), renderizar espacio
            <div className="w-full"></div>
          ) : (
            <Seat
              id={seat.id}
              number={seat.number}
              status={seat.status === "Vendido" ? "Vendido" : "Libre"}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Bus;
