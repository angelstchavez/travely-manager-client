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
      seatColor = "bg-yellow-400";
      hoverColor = "hover:bg-yellow-500";
      break;
    case "Vendido":
      seatColor = "bg-green-400";
      hoverColor = "hover:bg-green-500";
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
      style={{ width: "50px", height: "50px" }} // Aplicar color de fondo dinámico
      onMouseEnter={onHover} // Manejar el evento hover
    >
      <span className="text-black font-bold text-lg">{number}</span>
      {/* Agregar el SVG a continuación del número */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style={{ width: "20px", height: "20px", marginLeft: "5px" }}
      >
        <g>
          <g>
            <path
              style={{ fill: status === "Libre" ? "#010101" : seatColor }}
              d="M454.93,149.175V88.051C454.93,38.047,424.493,0,386.446,0h-246.76
              c-38.047,0-68.484,39.134-68.484,88.051v59.788h-8.696c-34.786,0-61.962,28.263-61.962,63.049v239.151
              C0.544,483.737,27.72,512,62.505,512h30.437c32.321,0,59.625-25.006,61.805-58.701h202.436C358.87,485.54,385.4,512,419.057,512
              h30.437c34.786,0,61.962-27.176,61.962-61.962V210.887C511.456,178.967,487.068,151.941,454.93,149.175z M140.773,43.482h245.673
              c11.958,0,26.089,18.48,26.089,44.569v61.223c-30.744,3.239-55.44,29.099-55.44,61.614v108.705H154.904V209.8
              c0-26.249-16.491-49.195-40.221-58.06v-63.69C114.684,63.049,128.815,43.482,140.773,43.482z M112.51,450.038
              c0,10.87-8.696,19.567-19.567,19.567H62.505c-10.87,0-19.567-8.696-19.567-19.567V210.888c0-10.871,8.696-19.567,19.567-19.567
              h30.437c10.87,0,19.567,8.696,19.567,19.567v130.446v90.225V450.038z M154.904,363.074h202.191v47.83H154.904V363.074z
              M469.062,450.038c0,10.87-8.696,19.567-19.567,19.567h-30.437c-10.871,0-19.567-8.696-19.567-19.567v-13.177
              c0.549-1.699,0.921-3.475,1.087-5.303v-90.225c0-2.357-0.385-4.627-1.087-6.756v-123.69c0-10.871,8.696-19.567,19.567-19.567
              h30.437c10.87,0,19.567,8.696,19.567,19.567V450.038z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Seat;
