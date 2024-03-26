import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface TripDetailsProps {
  tripId: number;
}

const TripDetails: React.FC<TripDetailsProps> = ({ tripId }) => {
  const [tripDetails, setTripDetails] = useState<any>(null);

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
          `http://localhost:90/api/v1/trip/get-by-id/${tripId}`,
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
        setTripDetails(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tripId]);

  if (!tripDetails) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto border rounded p-2">
      <h2 className="font-semibold text-center bg-tm20 rounded text-white py-1">
        {tripDetails.travelRoute.departureCity.name} -{" "}
        {tripDetails.travelRoute.destinationCity.name}
      </h2>
      <div className="py-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Fecha de Viaje</h3>
          <p>{tripDetails.travelDate}</p>
          <h3 className="font-semibold">Hora de Viaje</h3>
          <p>{tripDetails.travelTime}</p>
          <h3 className="font-semibold">Precio del Boleto</h3>
          <p>{tripDetails.ticketPrice}</p>
        </div>
        <div>
          <h3 className="font-semibold">Distancia</h3>
          <p>{tripDetails.travelRoute.distanceKilometers} Km</p>
          <h3 className="font-semibold">Duración</h3>
          <p>{tripDetails.travelRoute.durationHours} Horas</p>
          <p>Salida: {tripDetails.departureTerminal.name}</p>
          <p>Llegada: {tripDetails.destinationTerminal.name}</p>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
