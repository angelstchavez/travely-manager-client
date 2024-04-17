import React, { useState } from "react";
import TotalSale from "../utils/sale/total-sale";
import PassengerForm from "./passenger-form";
import PaymentDetails from "./payment-details";
import SeatStatusCounts from "../utils/sale/seat-counter";
import Bus from "../utils/sale/bus";
import TripDetails from "../utils/sale/trip-detail";
import SelectedSeatsDisplay from "../utils/sale/selected-seat";
import ConfirmationModal from "../modals/confirmation-modal";

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
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [showMainSection, setShowMainSection] = useState(true);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

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
    setShowCancelConfirmation(true);
  };

  const handleCancelConfirmed = () => {
    onCancel();
    setShowCancelConfirmation(false);
  };

  const handleCancelModalClose = () => {
    setShowCancelConfirmation(false);
  };

  const handleRegisterPassengers = () => {
    setShowMainSection(false);
    setShowPaymentSection(true);
  };

  const handleCancelOperation = () => {
    setShowPaymentSection(false);
    setShowMainSection(true);
    setSelectedSeats([]);
    setPassengers([]);
  }; 

  const handlePayment = async () => {
    try {
      const response = await fetch(
        "http://localhost:90/api/v1/ticket-sale/create-sale",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer tu_token_de_autenticacion",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            seatIds: selectedSeats.map((seat) => seat.id),
            passengers: passengers,
            tripId: tripId,
            paymentMethodId: 0,
            customerModel: {
              person: {
                id: 0,
                names: "Nombres del cliente",
                surnames: "Apellidos del cliente",
                identificationType: "Tipo de Identificación",
                identificationNumber: "Número de Identificación",
                gender: "Género",
                birthdate: "1990-01-01",
                email: "correo@cliente.com",
                mobilePhone: "1234567890",
                createdAt: new Date().toISOString(),
              },
              createdAt: new Date().toISOString(),
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      // Aquí podrías realizar alguna acción adicional si la solicitud fue exitosa
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
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
                <TotalSale tripId={tripId} count={selectedSeats.length} />
              </div>
              <div className="mt-2 px-1 flex justify-end">
                <button
                  onClick={handleCancel}
                  className="bg-zinc-200 text-zinc-400 p-1 px-3 rounded border mr-2"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleRegisterPassengers}
                  className="bg-orange-600 hover:bg-orange-600/90 text-white font-semibold p-1 px-3 rounded"
                >
                  Registrar pasajeros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPaymentSection && (
        <div className="p-2">
          {selectedSeats.map((seat, index) => (
            <PassengerForm
              key={index}
              seatNumber={seat.number}
              onSubmit={(passenger: Passenger) => setPassengers((prevPassengers) => [...prevPassengers, passenger])}
            />
          ))}
          <PaymentDetails
            onSubmit={handlePayment}
            onCancel={handleCancelOperation}
            selectedSeats={selectedSeats}
            tripId={tripId}
          />
        </div>
      )}
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
