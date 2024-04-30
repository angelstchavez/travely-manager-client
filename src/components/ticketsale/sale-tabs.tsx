import React, { useState } from "react";
import Cookies from "js-cookie";
import SeatSelectionForm from "./seat-selected-form";
import PassengerInfoForm from "./passenger-info-form";
import PaymentForm from "./payment-form";
import MyComponent from "./customer-sale";
import SaleRegistration from "./customer-sale";
import SuccessModal from "../modals/success-modal";
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
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [passengers, setPassengers] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [canContinueSeatsTab, setCanContinueSeatsTab] =
    useState<boolean>(false);
  const [allPassengersRegistered, setAllPassengersRegistered] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    names: "",
    surnames: "",
    identificationType: "",
    identificationNumber: "",
    gender: "",
    birthdate: "",
    email: "",
    mobilePhone: "",
    paymentMethodId: 0,
    amountGivenByCustomer: 0,
  });

  const handleTabChange = (index: number) => {
    return;
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

      const passengersList = passengers.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ticket-sale/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            seatIds: selectedSeats.map((seat) => seat.id),
            passengers: passengersList,
            tripId: tripId,
            paymentMethodId: formData.paymentMethodId,
            amountGivenByCustomer: formData.amountGivenByCustomer,
            customerModel: {
              person: {
                names: formData.names,
                surnames: formData.surnames,
                identificationType: formData.identificationType,
                identificationNumber: formData.identificationNumber,
                gender: formData.gender,
                birthdate: formData.birthdate,
                email: formData.email,
                mobilePhone: formData.mobilePhone,
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
      setShowSuccessModal(true);
    } catch (error: any) {
      setErrorMessage(error.message || "Error al crear la venta.");
    }
  };

  const handleAddPassenger = (newPassenger: any) => {
    const updatedPassengers = [...passengers];
    updatedPassengers.push(newPassenger);
    setPassengers(updatedPassengers);

    // Verifica si todos los pasajeros están registrados
    const allRegistered = updatedPassengers.every((passenger) => passenger);
    setAllPassengersRegistered(allRegistered);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };
  return (
    <>
      <div className={`border rounded-lg max-w-2xl mx-auto p-4 ${showComponent ? "" : "hidden"}`}>
        <div className="flex border-b border-gray-200 rounded-lg border ">
          {[
            "1. Seleccionar asientos",
            "2. Registrar pasajeros",
            "3. Realizar pago",
          ].map((label, index) => (
            <div
              key={index}
              className={`${
                activeTab === index ? "border-tm20 bg-zinc-100" : ""
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
              <div className="flex justify-between mt-1">
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
                      : "bg-tm20 hover:bg-tm10 text-white hover:text-white"
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
                    <PassengerInfoForm
                      onAddPassengers={(newPassenger) => {
                        handleAddPassenger(newPassenger);
                      }}
                      seatNumber={seat.number}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-1">
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
                      ? "bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded focus:outline-none"
                      : "bg-tm20 hover:bg-tm10 text-white font-medium py-2 px-4 rounded focus:outline-none"
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
              <SaleRegistration
                formData={formData}
                handleChange={handleChange}
                tripId={tripId}
                seatCount={selectedSeats.length}
                selectedSeatIds={selectedSeats}
              />
              <div className="flex justify-between mt-1">
                <button
                  onClick={handlePrev}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none"
                >
                  Regresar
                </button>
                <button
                  onClick={handlePayment}
                  disabled={!allPassengersRegistered}
                  className={`${
                    !allPassengersRegistered 
                      ? "bg-gray-300 text-gray-800"
                      : "bg-green-700 hover:bg-green-600 text-white hover:text-white"
                  } font-medium py-2 px-4 rounded focus:outline-none`}
                >
                  Pagar
                </button>
              </div>
            </Tab>
          )}
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          successMessage={successMessage}
        />
      )}
    </>
  );
};

export default TabsNavigation;
