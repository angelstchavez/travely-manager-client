import React, { useState } from "react";
import TotalSale from "../utils/sale/total-sale";
import PassengerForm from "./passenger-form";
import PaymentDetails from "./payment-details";
import SeatStatusCounts from "../utils/sale/seat-counter";
import Bus from "../utils/sale/bus";
import TripDetails from "../utils/sale/trip-detail";
import SelectedSeatsDisplay from "../utils/sale/selected-seat";
import ConfirmationModal from "../modals/confirmation-modal";
import CustomerDetails from "./customer-details";
import SuccessModal from "../modals/success-modal";
import Cookies from "js-cookie";

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
  const [customerDetails, setCustomerDetails] = useState<any>({});
  const [showMainSection, setShowMainSection] = useState(true);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorDescription, setErrorDescription] = useState<string>("");

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
    setCustomerDetails({});
  };

  const handlePayment = async () => {
    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData = JSON.parse(cookieValue);
      const token = cookieData.data.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ticket-sale/create-ticket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            seatIds: selectedSeats.map((seat) => seat.id),
            passengers: passengers,
            tripId: tripId,
            paymentMethodId: 1,
            customerModel: {
              person: {
                id: 0,
                names: customerDetails.names,
                surnames: customerDetails.surnames,
                identificationType: customerDetails.identificationType,
                identificationNumber: customerDetails.identificationNumber,
                gender: customerDetails.gender,
                birthdate: customerDetails.birthdate,
                email: customerDetails.email,
                mobilePhone: customerDetails.mobilePhone,
                createdAt: new Date().toISOString(),
              },
              createdAt: new Date().toISOString(),
            },
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.data || "Error al crear la venta.");
      }

      // Si la solicitud fue exitosa, mostramos el modal de éxito
      setSuccessMessage("La venta creó satisfactoriamente.");
    } catch (error: any) {
      setErrorDescription(
        error.message || "Error al crear la marca de vehículo."
      );
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {selectedSeats.map((seat, index) => (
              <PassengerForm
                key={index}
                seatNumber={seat.number}
                onSubmit={(passenger: Passenger) =>
                  setPassengers((prevPassengers) => [
                    ...prevPassengers,
                    passenger,
                  ])
                }
              />
            ))}
          </div>
          {/* Utilizamos el componente CustomerDetails para obtener los detalles del cliente */}
          <CustomerDetails
            onCustomerDetailsChange={(details: any) =>
              setCustomerDetails(details)
            }
          />
          <PaymentDetails
            onSubmit={handlePayment}
            onCancel={handleCancelOperation}
            selectedSeats={selectedSeats}
            tripId={tripId}
          />
          {errorDescription && (
            <p className="text-red-500 text-sm mt-2 font-bold">
              {errorDescription}
            </p>
          )}
          {successMessage && <SuccessModal successMessage={successMessage} />}
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
