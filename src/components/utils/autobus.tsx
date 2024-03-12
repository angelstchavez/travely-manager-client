import React from "react";

interface AutobusProps {
  seats: JSX.Element[]; // Arreglo de sillas representadas como elementos JSX
}

const Autobus: React.FC<AutobusProps> = ({ seats }) => {
  // Dividir el arreglo de sillas en 4 columnas
  const columnSize = Math.ceil(seats.length / 4);
  const firstRow = seats.slice(0, columnSize);
  const secondRow = seats.slice(columnSize, columnSize * 2);
  const thirdRow = seats.slice(columnSize * 2, columnSize * 3);
  const fourthRow = seats.slice(columnSize * 3);

  return (
    <div className="grid grid-cols-5 bg-white
    rounded-lg border border-gray-300 p-2 xl:p-5">
      <div className="col-span-1">
        {firstRow.map((seat, index) => (
          <div key={`first-row-${index}`} className="mb-2">
            {seat}
          </div>
        ))}
      </div>
      <div className="col-span-2">
        {secondRow.map((seat, index) => (
          <div key={`second-row-${index}`} className="mb-2">
            {seat}
          </div>
        ))}
      </div>
      <div className="col-span-1">
        {thirdRow.map((seat, index) => (
          <div key={`third-row-${index}`} className="mb-2">
            {seat}
          </div>
        ))}
      </div>
      <div className="col-span-1">
        {fourthRow.map((seat, index) => (
          <div key={`fourth-row-${index}`} className="mb-2">
            {seat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Autobus;
