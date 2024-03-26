import React from "react";

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
  // Agrega cualquier otra información relevante sobre el pasajero
}

interface PaymentSaleFormProps {
  passengers: Passenger[];
  onCancel: () => void;
}

const PaymentSaleForm: React.FC<PaymentSaleFormProps> = ({
  passengers,
  onCancel,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica de envío del formulario de pago
  };

  return (
    <div>
      <h2>Detalles de pasajeros:</h2>
      <ul>
        {passengers.map((passenger, index) => (
          <li key={index}>
            <strong>Nombre:</strong> {passenger.name} {passenger.surname},{" "}
            <br />
            <strong>Tipo de Documento:</strong> {passenger.documentType}, <br />
            <strong>Número de Documento:</strong> {passenger.documentNumber},{" "}
            <br />
            <strong>Email:</strong> {passenger.email}, <br />
            <strong>Asiento:</strong> {passenger.seat.number}
            {/* Puedes mostrar cualquier otra información relevante sobre el pasajero */}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        {/* Agrega aquí los campos del formulario de pago, por ejemplo: */}
        <label>
          Número de Tarjeta:
          <input type="text" />
        </label>
        <label>
          Fecha de Vencimiento:
          <input type="text" />
        </label>
        <label>
          Código CVV:
          <input type="text" />
        </label>
        {/* Aquí podrías agregar más campos, como el nombre del titular de la tarjeta, etc. */}
        <button type="submit">Realizar Pago</button>
        <button type="button" onClick={onCancel}>
          Cancelar Pago
        </button>
      </form>
    </div>
  );
};

export default PaymentSaleForm;
