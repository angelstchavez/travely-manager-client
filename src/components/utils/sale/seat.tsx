import React, { useState } from "react";

interface SeatProps {
  id: string;
  number: number;
  status: "Disponible" | "Reservado" | "Vendido";
  onSeatClick: (seatData: { id: string; number: number }) => void; // Modificada la prop para enviar el objeto con ID y número
}

const Seat: React.FC<SeatProps> = ({ id, number, status, onSeatClick }) => {
  const [selected, setSelected] = useState<boolean>(false);

  let seatColor = "";
  let textColor = "";
  let hoverColor = "";
  switch (status) {
    case "Disponible":
      seatColor = selected ? "bg-yellow-400" : "bg-white";
      textColor = selected ? "text-yellow-800" : "text-zinc-400";
      hoverColor = selected ? "hover:bg-yellow-300" : "hover:bg-gray-100";
      break;
    case "Reservado":
      seatColor = "bg-zinc-500";
      textColor = "text-white";
      hoverColor = "hover:bg-zinc-500";
      break;
    case "Vendido":
      seatColor = "bg-tm20";
      textColor = "text-white";
      hoverColor = "hover:bg-tm20";
      break;
    default:
      seatColor = "bg-tm00";
      textColor = "text-black";
      hoverColor = "hover:bg-gray-100";
      break;
  }

  const handleClick = () => {
    if (status === "Disponible") {
      setSelected(!selected);
      onSeatClick({ id, number }); // Enviar objeto con ID y número al hacer clic en la silla
    }
  };

  return (
    <div
      id={id}
      className={`border border-gray-300 rounded-md flex items-center justify-center transition-colors duration-200 cursor-pointer ${seatColor} ${hoverColor}`}
      style={{ width: "50px", height: "50px" }}
      onClick={handleClick}
    >
      <span className={`font-bold text-xl ${textColor}`}>{number}</span>
    </div>
  );
};

export default Seat;
