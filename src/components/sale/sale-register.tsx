import React, { useState } from "react";
import Bus from "../utils/sale/bus";
import SeatStatusCounts from "../utils/sale/seat-counter";
import TripDetails from "../utils/sale/trip-detail";
import SelectedSeatsDisplay from "../utils/sale/selected-seat";
import ConfirmationModal from "../modals/confirmation-modal"; // Importamos el componente de confirmación
import TotalSale from "../utils/sale/total-sale";

interface SaleRegisterProps {
  tripId: number;
  onCancel: () => void;
}

interface Passenger {
  name: string;
  surname: string;
  documentType: string;
  documentNumber: string;
  email: string;
  seat: {
    id: string;
    number: number;
  };
}

const SaleRegister: React.FC<SaleRegisterProps> = ({ tripId, onCancel }) => {
  const [selectedSeats, setSelectedSeats] = useState<
    { id: string; number: number }[]
  >([]);
  const [showMainSection, setShowMainSection] = useState(true);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false); // Estado para controlar la visibilidad del modal de confirmación

  const handleSelectedSeatsChange = (newSelectedSeat: {
    id: string;
    number: number;
  }) => {
    if (
      selectedSeats.length < 5 ||
      selectedSeats.some((seat) => seat.id === newSelectedSeat.id)
    ) {
      setSelectedSeats((prevSelectedSeats) => {
        const existingIndex = prevSelectedSeats.findIndex(
          (seat) => seat.id === newSelectedSeat.id
        );
        if (existingIndex !== -1) {
          return prevSelectedSeats.filter(
            (_, index) => index !== existingIndex
          );
        } else {
          return [...prevSelectedSeats, newSelectedSeat];
        }
      });
    }
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true); // Mostramos el modal de confirmación cuando se hace clic en cancelar
  };

  const handleCancelConfirmed = () => {
    onCancel(); // Llamamos a la función onCancel cuando se confirma la cancelación
    setShowCancelConfirmation(false); // Ocultamos el modal de confirmación después de confirmar
  };

  const handleCancelModalClose = () => {
    setShowCancelConfirmation(false); // Ocultamos el modal de confirmación si se cancela
  };

  return (
    <>
      {showMainSection && (
        <div className="flex justify-center items-center p-2">
          <div className="flex flex-col sm:flex-row gap-2 p-2">
            <div className="overflow-hidden md:w-[300px] lg:w-[300px]">
              <SeatStatusCounts tripId={tripId} />
              <Bus
                tripId={tripId}
                onSelectedSeatsChange={handleSelectedSeatsChange}
              />
            </div>
            <div className="overflow-hidden flex-grow">
              <TripDetails tripId={tripId} />
              <div className="overflow-hidden flex-grow">
                <SelectedSeatsDisplay selectedSeatIds={selectedSeats} />
              </div>
              <div className="mt-2">
                <TotalSale
                  tripId={tripId}
                  count={selectedSeats.length}
                ></TotalSale>
              </div>
              <div className="mt-2 px-1 flex justify-end">
                <button
                  onClick={handleCancel}
                  className="bg-zinc-200 text-zinc-400 p-1 px-3 rounded border mr-2"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCancel}
                  className=" bg-orange-600 hover:bg-orange-600/90 text-white font-semibold p-1 px-3 rounded"
                >
                  Registrar pasajeros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Mostramos el modal de confirmación si showCancelConfirmation es verdadero */}
      {showCancelConfirmation && (
        <ConfirmationModal
          processText="cancelar la compra"
          onAccept={handleCancelConfirmed}
          onCancel={handleCancelModalClose}
          actionType="register"
        />
      )}
    </>
  );
};

export default SaleRegister;
