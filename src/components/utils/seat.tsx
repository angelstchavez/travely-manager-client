import React from "react";

interface SeatProps {
  id: string;
  number: number;
  status: "Libre" | "Reservado" | "Vendido"; // Estado del asiento
  onHover?: () => void; // Propiedad opcional para manejar el evento hover
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
      seatColor = "bg-yellow-200";
      hoverColor = "hover:bg-yellow-300";
      break;
    case "Vendido":
      seatColor = "bg-green-200";
      hoverColor = "hover:bg-green-300";
      break;
    default:
      seatColor = "bg-white";
      hoverColor = "hover:bg-gray-100";
      break;
  }

  return (
    <div
      id={id}
      className={`border border-gray-300 p-2 rounded-md flex items-center justify-center transition-colors duration-300 cursor-pointer ${seatColor} ${hoverColor}`}
      style={{ width: "60px", height: "60px" }} // Aplicar color de fondo dinámico
      onMouseEnter={onHover} // Manejar el evento hover
    >
      <span className="text-black font-bold text-lg">{number}</span>
    </div>
  );
};

export default Seat;
