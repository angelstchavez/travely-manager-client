"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { SaleTabManager, Tab } from "@/components/test/sale-tab-manager";
import SeatSelectionForm from "@/components/test2/seat-selected-form";
import PassengerInfoForm from "@/components/test2/passenger-info-form";
import PaymentForm from "@/components/test2/payment-form";

interface PageProps {
  tripId: number;
}

function SaleManagerForm({ tripId }: PageProps): JSX.Element {
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [passengers, setPassengers] = useState<any[]>([]);
  const [customerDetails, setCustomerDetails] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [canContinueSeatsTab, setCanContinueSeatsTab] =
    useState<boolean>(false);
  const [canContinuePassengersTab, setCanContinuePassengersTab] =
    useState<boolean>(false);
  const [canContinuePaymentTab, setCanContinuePaymentTab] =
    useState<boolean>(false);

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
  };

  return (
    <SaleTabManager>
      <Tab title="Asientos" canContinue={canContinueSeatsTab}>
        <SeatSelectionForm
          onSelectSeats={(seats) => {
            setSelectedSeats(seats);
          }}
          tripId={tripId}
          onCanContinueChange={setCanContinueSeatsTab}
        />
      </Tab>

      <Tab title="Pasajeros" canContinue={canContinuePassengersTab}>
        {selectedSeats.map((seat, index) => (
          <PassengerInfoForm
            key={index}
            onAddPassengers={(passengers) => setPassengers(passengers)} seatNumber={""}          />
        ))}
      </Tab>

      <Tab title="Pago" canContinue={canContinuePaymentTab}>
        <PaymentForm
          onConfirmPayment={handlePayment}
          onSetCustomerDetails={(details) => setCustomerDetails(details)}
          onSetTripId={(id: string) => {
            throw new Error("Function not implemented.");
          }}
        />
      </Tab>
    </SaleTabManager>
  );
}

export default SaleManagerForm;
