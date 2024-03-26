import React from "react";
import Bus from "../utils/sale/bus";
import SeatStatusCounts from "../utils/sale/seat-counter";
import TripDetails from "../utils/sale/trip-detail";

interface SaleRegisterProps {
  tripId: number;
  onCancel: () => void;
}

const SaleRegister: React.FC<SaleRegisterProps> = ({ tripId, onCancel }) => {
  return (
    <>
      <div className="bg-white rounded-md shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
          <div>
            <SeatStatusCounts tripId={tripId} />
            <Bus tripId={tripId} />
          </div>
          <div className="overflow-auto">
            <TripDetails tripId={tripId} />
          </div>
        </div>
        <div className="flex justify-end p-2">
          <div className="space-x-2">
            <button
              onClick={onCancel}
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={onCancel}
              className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Registrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleRegister;
