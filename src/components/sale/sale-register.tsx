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
      <div className="bg-white rounded-md shadow-lg p-1 overflow-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
          <div className="overflow-hidden md:w-[300px] md:h-[650px] lg:w-[300px] lg:h-[650px]">
            <Bus tripId={tripId} />
          </div>
          <div className="overflow-hidden md:w-[300px] md:h-[650px] lg:w-[300px] lg:h-[650px]">
            <SeatStatusCounts tripId={tripId} />
            <TripDetails tripId={tripId} />
            <div className="flex justify-end py-2">
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
        </div>
      </div>
    </>
  );
};

export default SaleRegister;
