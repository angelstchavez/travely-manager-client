import Autobus from "@/components/utils/autobus";
import Seat from "@/components/utils/seat";
import React from "react";

function RegisterSalePage() {
  // Definir los tipos de los estados de las sillas
  type SeatStatus = "Libre" | "Reservado" | "Vendido";

  // Crear un arreglo de 40 sillas con diferentes estados
  const seatsArray: JSX.Element[] = [];
  const totalSeats = 40;
  const statuses: SeatStatus[] = ["Libre", "Reservado", "Vendido"];

  for (let i = 1; i <= totalSeats; i++) {
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const status: SeatStatus = statuses[statusIndex];
    seatsArray.push(
      <Seat key={i} id={`seat-${i}`} number={i} status={status} />
    );
  }

  return (
    <>
      <span className="font-bold text-4xl">Registrar venta</span>
      <div className="flex">
        <div className="w-1/2">
          <Autobus seats={seatsArray} />
        </div>
        <div
          className="bg-white rounded-lg border border-gray-300 flex-1"
        ></div>
      </div>
    </>
  );
}

export default RegisterSalePage;
