import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface SeatStatusCountsProps {
  tripId: number; // Propiedad para el ID del viaje
}

const SeatStatusCounts: React.FC<SeatStatusCountsProps> = ({ tripId }) => {
  const [statusCounts, setStatusCounts] = useState({
    Disponible: 0,
    Reservado: 0,
    Vendido: 0,
  });

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
          `http://localhost:90/api/v1/seat/status-counts/${tripId}`, // Se utiliza tripId en la URL del endpoint
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
        setStatusCounts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tripId]); // Se agrega tripId como dependencia para que useEffect se ejecute cuando cambie

  return (
    <div className="mb-4 flex justify-center items-center border rounded p-2">
      <div>
        <div className="text-center">
          <h2 className="text-xl font-bold">Estado de Asientos</h2>
        </div>
        <div className="flex justify-center">
          <div className="mr-6 flex flex-col items-center">
            <span className="text-4xl text-zinc-300">
              <Icon icon="material-symbols:event-seat" />
            </span>
            <p className="text-sm text-gray-700">
              Disponibles: {statusCounts.Disponible}
            </p>
          </div>
          <div className="mr-6 flex flex-col items-center">
            <span className="text-4xl text-yellow-500">
              <Icon icon="material-symbols:event-seat" />
            </span>
            <p className="text-sm text-gray-700">
              Reservados: {statusCounts.Reservado}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl text-green-600">
              <Icon icon="material-symbols:event-seat" />
            </span>
            <p className="text-sm">Vendidos: {statusCounts.Vendido}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatStatusCounts;
