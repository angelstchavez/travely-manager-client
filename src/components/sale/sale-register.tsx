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
    <div className="fixed inset-0 z-50 overflow-auto bg-tm90 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        <div>
          <Bus tripId={tripId} />
        </div>
        <div className="overflow-auto">
          <SeatStatusCounts tripId={tripId} />
          <TripDetails tripId={tripId} />
        </div>
        <div>
          <button
            onClick={onCancel}
            className="mt-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleRegister;
