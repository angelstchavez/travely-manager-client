"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface CustomerDetails {
  names: string;
  surnames: string;
  identificationType: string;
  identificationNumber: string;
  gender: string;
  birthdate: string;
  email: string;
  mobilePhone: string;
}

interface PaymentMethod {
  id: number;
  name: string;
}

interface Props {
  onConfirmPayment: (paymentData: any) => void;
  onSetCustomerDetails: (details: CustomerDetails) => void;
}

const PaymentForm: React.FC<Props> = ({
  onConfirmPayment,
  onSetCustomerDetails,
}) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<number>(-1);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    names: "",
    surnames: "",
    identificationType: "",
    identificationNumber: "",
    gender: "",
    birthdate: "",
    email: "",
    mobilePhone: "",
  });
  const [amountGivenByCustomer, setAmountGivenByCustomer] = useState<number>(0);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData = JSON.parse(cookieValue);
      const token = cookieData.data.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment-method/get-all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los métodos de pago.");
      }

      const responseData = await response.json();

      if (!Array.isArray(responseData.data)) {
        throw new Error("Los datos recibidos no son un array.");
      }

      const data: PaymentMethod[] = responseData.data;
      setPaymentMethods(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmPayment = () => {
    const paymentData = {
      paymentMethodId: selectedPaymentMethod,
      amountGivenByCustomer,
      customerModel: {
        person: customerDetails,
        createdAt: new Date().toISOString(),
      },
    };
    onConfirmPayment(paymentData);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "amountGivenByCustomer") {
      setAmountGivenByCustomer(parseFloat(value));
    } else {
      setCustomerDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPaymentMethod(parseInt(event.target.value));
  };

  return (
    <div>
      <h2>Ingresa los datos de pago:</h2>
      <div>
        <label htmlFor="paymentMethod">Método de Pago:</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={selectedPaymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <option value={-1}>Selecciona un método de pago</option>
          {paymentMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="amountGivenByCustomer">Monto Pagado:</label>
        <input
          type="number"
          id="amountGivenByCustomer"
          name="amountGivenByCustomer"
          value={amountGivenByCustomer}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="names">Nombres:</label>
        <input
          type="text"
          id="names"
          name="names"
          value={customerDetails.names}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="surnames">Apellidos:</label>
        <input
          type="text"
          id="surnames"
          name="surnames"
          value={customerDetails.surnames}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="identificationType">Tipo de Identificación:</label>
        <input
          type="text"
          id="identificationType"
          name="identificationType"
          value={customerDetails.identificationType}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="identificationNumber">Número de Identificación:</label>
        <input
          type="text"
          id="identificationNumber"
          name="identificationNumber"
          value={customerDetails.identificationNumber}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="gender">Género:</label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={customerDetails.gender}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="birthdate">Fecha de Nacimiento:</label>
        <input
          type="text"
          id="birthdate"
          name="birthdate"
          value={customerDetails.birthdate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={customerDetails.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="mobilePhone">Teléfono Móvil:</label>
        <input
          type="tel"
          id="mobilePhone"
          name="mobilePhone"
          value={customerDetails.mobilePhone}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleConfirmPayment}>Confirmar Pago</button>
    </div>
  );
};

export default PaymentForm;
