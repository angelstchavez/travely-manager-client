import React, { useState } from "react";
import Bus from "../utils/sale/bus";
import SeatStatusCounts from "../utils/sale/seat-counter";
import TripDetails from "../utils/sale/trip-detail";
import SelectedSeatsDisplay from "../utils/sale/selected-seat";

interface SaleRegisterProps {
  tripId: number;
  onCancel: () => void;
}

const SaleRegister: React.FC<SaleRegisterProps> = ({ tripId, onCancel }) => {
  const [selectedSeats, setSelectedSeats] = useState<
    { id: string; number: number }[]
  >([]);
  const [continueClicked, setContinueClicked] = useState(false);

  const handleSelectedSeatsChange = (newSelectedSeat: {
    id: string;
    number: number;
  }) => {
    setSelectedSeats((prevSelectedSeats) => {
      const existingIndex = prevSelectedSeats.findIndex(
        (seat) => seat.id === newSelectedSeat.id
      );
      if (existingIndex !== -1) {
        return prevSelectedSeats.filter((_, index) => index !== existingIndex);
      } else {
        return [...prevSelectedSeats, newSelectedSeat];
      }
    });
  };

  const handleContinueClick = () => {
    setContinueClicked(true);
    // Aquí puedes agregar cualquier lógica adicional antes de cambiar de pantalla
    // Por ejemplo, limpiar el estado selectedSeats
    setSelectedSeats([]);
  };

  // Lógica para renderizar los componentes después de hacer clic en "Continuar"
  if (continueClicked) {
    // Aquí puedes devolver los componentes que deseas mostrar después de hacer clic en "Continuar"
    // Por ejemplo:
    return (
      <>
        <SelectedSeatsDisplay selectedSeatIds={selectedSeats} />
      </>
    );
  }

  return (
    <>
      <div className="bg-white rounded-md shadow-lg p-1 overflow-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
          <div className="overflow-hidden md:w-[300px] md:h-[650px] lg:w-[300px] lg:h-[650px]">
            <Bus
              tripId={tripId}
              onSelectedSeatsChange={handleSelectedSeatsChange}
            />
          </div>
          <div className="overflow-hidden md:w-[300px] md:h-[650px] lg:w-[300px] lg:h-[650px]">
            <SeatStatusCounts tripId={tripId} />
            <TripDetails tripId={tripId} />
            <SelectedSeatsDisplay selectedSeatIds={selectedSeats} />
            <div className="flex justify-end py-2">
              <div className="space-x-2">
                <button
                  onClick={onCancel}
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleContinueClick} // Cambiado el onClick a la nueva función handleContinueClick
                  className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Continuar
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
