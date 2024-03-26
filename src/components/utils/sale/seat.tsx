import React from "react";

interface SeatProps {
  id: string;
  number: number;
  status: "Disponible" | "Reservado" | "Vendido";
  onHover?: () => void;
}

const Seat: React.FC<SeatProps> = ({ id, number, status, onHover }) => {
  let seatColor = "";
  let textColor = "";
  let hoverColor = "";
  switch (status) {
    case "Disponible":
      seatColor = "bg-white";
      textColor = "text-zinc-400";
      hoverColor = "hover:bg-gray-100";
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

  return (
    <div
      id={id}
      className={`border border-gray-300 rounded-md flex items-center justify-center transition-colors duration-200 cursor-pointer ${seatColor} ${hoverColor}`}
      style={{ width: "50px", height: "30px" }}
      onMouseEnter={onHover}
    >
      <span className={`font-bold text-xl ${textColor}`}>{number}</span>
    </div>
  );
};

export default Seat;
