import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface SeatProps {
  id: string;
  number: number;
  status: "Libre" | "Reservado" | "Vendido";
  onHover?: () => void;
}

const Seat: React.FC<SeatProps> = ({ id, number, status, onHover }) => {
  let seatColor = "";
  let hoverColor = "";
  switch (status) {
    case "Libre":
      seatColor = "bg-white";
      hoverColor = "hover:bg-gray-100";
      break;
    case "Reservado":
      seatColor = "bg-yellow-700";
      hoverColor = "hover:bg-yellow-600";
      break;
    case "Vendido":
      seatColor = "bg-green-700";
      hoverColor = "hover:bg-green-600";
      break;
    default:
      seatColor = "bg-tm00";
      hoverColor = "hover:bg-gray-100";
      break;
  }

  return (
    <div
      id={id}
      className={`border border-gray-300 p-1 rounded-md flex items-center justify-center transition-colors duration-200 cursor-pointer ${seatColor} ${hoverColor}`}
      style={{ width: "60px", height: "60px" }} // Aplicar color de fondo dinámico
      onMouseEnter={onHover} // Manejar el evento hover
    >
      <span className="text-tm70 font-bold text-2xl p-1">{number}</span>
    </div>
  );
};

export default Seat;
