import React, { useState } from "react";
import Bus from "../utils/sale/bus";
import SeatStatusCounts from "../utils/sale/seat-counter";
import TripDetails from "../utils/sale/trip-detail";
import SelectedSeatsDisplay from "../utils/sale/selected-seat";
import PassengersSale from "../utils/sale/passengers-sale";
import PaymentSale from "../utils/sale/payment-sale";

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
  const [showConfirmationSection, setShowConfirmationSection] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [passengers, setPassengers] = useState<Passenger[]>([]);

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
    const newPassengers: Passenger[] = selectedSeats.map((seat) => ({
      name: "",
      surname: "",
      documentType: "",
      documentNumber: "",
      email: "",
      seat: { id: seat.id, number: seat.number },
    }));
    setPassengers(newPassengers);
    setShowMainSection(false);
    setShowConfirmationSection(true);
  };

  const handleReturnClick = () => {
    setSelectedSeats([]);
    setShowMainSection(true);
    setShowConfirmationSection(false);
    setShowPaymentSection(false);
  };

  const handlePaymentClick = () => {
    setShowConfirmationSection(false);
    setShowPaymentSection(true);
  };

  return (
    <>
      {showMainSection && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
            <div className="overflow-hidden md:w-[300px] md:h-[600px] lg:w-[300px] lg:h-[600px]">
              <Bus
                tripId={tripId}
                onSelectedSeatsChange={handleSelectedSeatsChange}
              />
            </div>
            <div className="overflow-hidden md:w-[300px] md:h-[600px] lg:w-[300px] lg:h-[600px]">
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
                    onClick={handleContinueClick}
                    className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmationSection && (
        <div className="bg-white rounded-md border overflow-auto p-2">
          {selectedSeats.map((seat, index) => (
            <PassengersSale
              key={index}
              seatId={seat.id}
              seatNumber={seat.number}
              selectedSeat={seat}
            />
          ))}
          <div className="flex justify-end py-2">
            <div className="tm-1 space-x-2">
              <button
                onClick={handleReturnClick}
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-2 px-4 rounded"
              >
                Regresar
              </button>
            </div>
            <div className="space-x-2">
              <button
                onClick={handlePaymentClick}
                className="bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Formulario de pago
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentSection && (
        <PaymentSale
          passengers={passengers}
          onCancel={() => {
            setShowMainSection(true);
            setShowPaymentSection(false);
          }}
        />
      )}
    </>
  );
};

export default SaleRegister;
