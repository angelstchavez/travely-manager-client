import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "../loading";

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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/trip/get-by-id/${tripId}`,
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

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("es-CO");
  };

  const formatTime = (time: string): string => {
    const [hours, minutes, seconds] = time.split(":");
    const formattedHours = parseInt(hours) % 12 || 12; // Convertir a formato de 12 horas
    const amPm = parseInt(hours) < 12 ? "AM" : "PM";
    return `${formattedHours}:${minutes} ${amPm}`;
  };

  if (!tripDetails) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="container mx-auto border rounded p-2">
      <h2 className="font-semibold text-center bg-tm20 rounded text-white py-1">
        {tripDetails.travelRoute.departureCity.name} -{" "}
        {tripDetails.travelRoute.destinationCity.name}
      </h2>
      <div className="grid grid-cols-4 md:grid-cols-2 gap-4">
        <div className="text-center">
          <h3 className="font-semibold">Fecha de Viaje</h3>
          <p>{formatDate(tripDetails.travelDate)}</p>
          <h3 className="font-semibold">Hora de Viaje</h3>
          <p>{formatTime(tripDetails.travelTime)}</p>
          <h3 className="font-semibold">Precio del Boleto</h3>
          <div className="inline-block bg-zinc-200 font-semibold rounded px-1">
            {formatCurrency(tripDetails.ticketPrice)}
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-semibold">Distancia</h3>
          <p>{tripDetails.travelRoute.distanceKilometers} Km</p>
          <h3 className="font-semibold">Duración</h3>
          <p>{tripDetails.travelRoute.durationHours} Horas</p>
          <h3 className="font-semibold">Autobús</h3>
          <div className="inline-block bg-zinc-200 font-semibold rounded px-1">
            Placa {tripDetails.carDriver.car.plate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
