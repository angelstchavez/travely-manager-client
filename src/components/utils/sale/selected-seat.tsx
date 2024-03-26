import React from "react";

interface SelectedSeatsDisplayProps {
  selectedSeatIds: { id: string; number: number }[];
}

const SelectedSeatsDisplay: React.FC<SelectedSeatsDisplayProps> = ({
  selectedSeatIds,
}) => {
  return (
    <div className="mt-2 bg-white rounded border p-1 overflow-auto">
      <h2 className="px-1 font-semibold">Asientos seleccionados</h2>
      <div className="flex flex-wrap">
        {selectedSeatIds.map((seat) => (
          <div key={seat.id} className="m-1">
            <div
              className={` border border-gray-300 rounded-md flex items-center justify-center transition-colors duration-200 bg-green-600 hover:bg-green-500`}
              style={{ width: "50px", height: "40px" }}
            >
              <span className={`font-bold text-xm text-white`}>
                {seat.number}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedSeatsDisplay;
