"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import SeatSelectionForm from "./seat-selected-form";
import PassengerInfoForm from "./passenger-info-form";
import PaymentForm from "./payment-form";

interface TabProps {
  children: React.ReactNode;
}

interface TabsNavigationProps {
  tripId: number;
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <div>{children}</div>;
};

const TabsNavigation: React.FC<TabsNavigationProps> = ({ tripId }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showComponent, setShowComponent] = useState(true);
  const [checkedStates, setCheckedStates] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [passengers, setPassengers] = useState<any[]>([]);
  const [customerDetails, setCustomerDetails] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [canContinueSeatsTab, setCanContinueSeatsTab] =
    useState<boolean>(false);
  const [allPassengersRegistered, setAllPassengersRegistered] = useState(false);
  const [passengerRegistered, setPassengerRegistered] = useState(false);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleNext = () => {
    setActiveTab(activeTab + 1);
  };

  const handlePrev = () => {
    setActiveTab(activeTab - 1);
  };

  const handleCancel = () => {
    window.location.reload();
    setShowComponent(false);
  };

  const handlePayment = async (): Promise<void> => {
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
            amountGivenByCustomer: 9000000,
            customerModel: {
              person: {
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

      setSuccessMessage("La venta se creó satisfactoriamente.");
    } catch (error: any) {
      setErrorMessage(error.message || "Error al crear la venta.");
    }

    console.log(selectedSeats);
  };

  const handleAddPassenger = (newPassenger: any) => {
    const updatedPassengers = [...passengers];
    updatedPassengers.push(newPassenger);
    setPassengers(updatedPassengers);

    // Verifica si todos los pasajeros están registrados
    const allRegistered = updatedPassengers.every((passenger) => passenger);
    setAllPassengersRegistered(allRegistered);
  };
  return (
    <div className={`max-w-2xl mx-auto ${showComponent ? "" : "hidden"}`}>
      <div className="flex border-b border-gray-200">
        {[
          "1. Seleccionar asientos",
          "2. Registrar pasajeros",
          "3. Realizar pago",
        ].map((label, index) => (
          <div
            key={index}
            className={`${
              activeTab === index ? "border-tm20" : ""
            } flex-1 text-center py-4 px-2 border-b-2 font-medium text-sm focus:outline-none`}
            onClick={() => handleTabChange(index)}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="mt-8">
        {activeTab === 0 && (
          <Tab>
            <div>
              <SeatSelectionForm
                onSelectSeats={(seats) => {
                  setSelectedSeats(seats);
                }}
                tripId={tripId}
                onCanContinueChange={setCanContinueSeatsTab}
              />
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={handleCancel}
                className="mr-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none"
              >
                Cancelar
              </button>
              <button
                onClick={handleNext}
                disabled={!canContinueSeatsTab}
                className={`${
                  !canContinueSeatsTab
                    ? "bg-gray-300 text-gray-800"
                    : "bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
                } font-medium py-2 px-4 rounded focus:outline-none`}
              >
                Continuar
              </button>
            </div>
          </Tab>
        )}
      </div>
      <div className="mt-8">
        {activeTab === 1 && (
          <Tab>
            <div>
              {selectedSeats.map((seat, index) => (
                <div key={index}>
                  <h3>Pasajero del asiento: {seat.number}</h3>
                  <PassengerInfoForm
                    onAddPassengers={(newPassenger) => {
                      handleAddPassenger(newPassenger);
                    }}
                    seatNumber={seat.number}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrev}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none"
              >
                Regresar
              </button>
              <button
                onClick={handleNext}
                disabled={!allPassengersRegistered}
                className={`${
                  !allPassengersRegistered
                    ? "bg-gray-300 text-gray-800"
                    : "bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none"
                }`}
              >
                Continuar
              </button>
            </div>
          </Tab>
        )}
      </div>
      <div className="mt-8">
        {activeTab === 2 && (
          <Tab>
            <div>
              <PaymentForm
                onConfirmPayment={handlePayment}
                onSetCustomerDetails={(details) => setCustomerDetails(details)}
              />
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrev}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none"
              >
                Regresar
              </button>
              <button
                onClick={() => {
                  handleNext();
                  handlePayment();
                }}
                disabled={!checkedStates[2]}
                className={`${
                  !checkedStates[2]
                    ? "bg-gray-300 text-gray-800"
                    : "bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
                } font-medium py-2 px-4 rounded focus:outline-none`}
              >
                Pagar
              </button>
            </div>
          </Tab>
        )}
      </div>
    </div>
  );
};

export default TabsNavigation;
