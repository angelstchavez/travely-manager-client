import React, { useState } from "react";

interface SelectedSeatsDisplayProps {
  selectedSeatIds: { id: string; number: number }[];
}

const SelectedSeatsDisplay: React.FC<SelectedSeatsDisplayProps> = ({
  selectedSeatIds,
}) => {
  return (
    <div className="mt-2 bg-white rounded border p-1 overflow-auto">
      <h2 className="px-1 font-semibold bg-tm20 rounded text-center p-1 text-white">
        Asientos seleccionados
      </h2>
      <div className="flex flex-wrap">
        {selectedSeatIds.length === 0 ? (
          <div className="m-1">
            <p className="text-center text-gray-500">
              No hay asientos seleccionados
            </p>
          </div>
        ) : (
          selectedSeatIds.map((seat) => (
            <div key={seat.id} className="m-1">
              <div
                className={` border border-gray-300 rounded-md flex items-center justify-center transition-colors duration-200 bg-green-600 hover:bg-green-500`}
                style={{ width: "40px", height: "40px" }}
              >
                <span className={`font-bold text-xm text-white`}>
                  {seat.number}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SelectedSeatsDisplay;
