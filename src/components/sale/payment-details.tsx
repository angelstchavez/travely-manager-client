import React, { useState } from "react";
import TotalSale from "../utils/sale/total-sale"; // Importamos el componente TotalSale
import TripDetails from "../utils/sale/trip-detail";
import SelectedSeatsDisplay from "../utils/sale/selected-seat";

interface PaymentDetailsProps {
  tripId: number;
  selectedSeats: { id: string; number: number }[];
  onSubmit: () => void;
  onCancel: () => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  tripId,
  selectedSeats,
  onSubmit,
  onCancel,
}) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardHolderName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Aquí podrías realizar la lógica para enviar los datos de pago al backend o realizar otras acciones necesarias
    onSubmit();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">Detalles de Pago</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Agregamos el componente TotalSale para mostrar los detalles de la venta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="overflow-hidden flex-grow">
            <TripDetails tripId={tripId} />
          </div>
          <div className="overflow-hidden flex-grow">
            <SelectedSeatsDisplay selectedSeatIds={selectedSeats} />
            <div className="mt-2">
              <TotalSale tripId={tripId} count={selectedSeats.length} />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Número de Tarjeta
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
            placeholder="Ingrese el número de tarjeta"
            value={paymentData.cardNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="expirationDate"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Vencimiento
          </label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
            placeholder="MM/YY"
            value={paymentData.expirationDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="cvv"
            className="block text-sm font-medium text-gray-700"
          >
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
            placeholder="Ingrese el CVV"
            value={paymentData.cvv}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="cardHolderName"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del Titular de la Tarjeta
          </label>
          <input
            type="text"
            id="cardHolderName"
            name="cardHolderName"
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
            placeholder="Ingrese el nombre del titular de la tarjeta"
            value={paymentData.cardHolderName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded mr-2"
          onClick={handleSubmit}
        >
          Pagar
        </button>
        <button
          type="button"
          className="bg-red-600 text-white font-semibold px-4 py-2 rounded"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
