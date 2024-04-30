import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CustomTitleIcon from "../utils/icons/custom-title-icon";

interface Person {
  id: number;
  names: string;
  surnames: string;
  identificationType: string;
  identificationNumber: string;
  gender: string;
  birthdate: string;
  email: string;
  mobilePhone: string;
  createdAt: string;
}

interface CustomerModel {
  person: Person;
}

interface PaymentData {
  paymentMethodId: number;
  amountGivenByCustomer: number;
  customerModel: CustomerModel;
}

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
  onConfirmPayment: (paymentData: PaymentData) => void;
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
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    const formErrors: Record<string, string> = {};
    Object.entries(customerDetails).forEach(([key, value]) => {
      if (typeof value === "string" && value.trim() === "") {
        formErrors[key] = "Este campo es obligatorio.";
      }
    });
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0 && selectedPaymentMethod !== -1) {
      const paymentData: PaymentData = {
        paymentMethodId: selectedPaymentMethod,
        amountGivenByCustomer,
        customerModel: {
          person: {
            ...customerDetails,
            createdAt: new Date().toISOString(),
            id: Math.floor(Math.random() * 1000), // Random ID for demonstration
          },
        },
      };
      onConfirmPayment(paymentData);
    }
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
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "" ? "Este campo es obligatorio." : "",
    }));
  };

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPaymentMethod(parseInt(event.target.value));
  };

  console.log(customerDetails);
  console.log(selectedPaymentMethod);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="bg-zinc-50 p-4 border border-zinc-00 rounded">
        <CustomTitleIcon
          icon="bi:credit-card-2-front"
          text="Ingresa los datos de pago:"
        />
        <div>
          <label htmlFor="paymentMethod">Método de Pago:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={selectedPaymentMethod}
            onChange={handlePaymentMethodChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              selectedPaymentMethod === -1 ? "border-red-500" : "border"
            }`}
          >
            <option value={-1}>Selecciona un método de pago</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
          {selectedPaymentMethod === -1 && (
            <p className="text-red-500 text-xs mt-1">
              Este campo es obligatorio.
            </p>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="amountGivenByCustomer">Monto Pagado:</label>
          <input
            type="number"
            id="amountGivenByCustomer"
            name="amountGivenByCustomer"
            value={amountGivenByCustomer}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.amountGivenByCustomer ? "border-red-500" : "border"
            }`}
          />
          {errors.amountGivenByCustomer && (
            <p className="text-red-500 text-xs mt-1">
              {errors.amountGivenByCustomer}
            </p>
          )}
        </div>
      </div>
      <div className="bg-zinc-50 p-4 border border-zinc-00 rounded">
        <div>
          <label htmlFor="names">Nombres:</label>
          <input
            type="text"
            id="names"
            name="names"
            value={customerDetails.names}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.names ? "border-red-500" : "border"
            }`}
          />
          {errors.names && (
            <p className="text-red-500 text-xs mt-1">{errors.names}</p>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="surnames">Apellidos:</label>
          <input
            type="text"
            id="surnames"
            name="surnames"
            value={customerDetails.surnames}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.surnames ? "border-red-500" : "border"
            }`}
          />
          {errors.surnames && (
            <p className="text-red-500 text-xs mt-1">{errors.surnames}</p>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="identificationType">Tipo de Identificación:</label>
          <select
            id="identificationType"
            name="identificationType"
            value={customerDetails.identificationType}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.identificationType ? "border-red-500" : "border"
            }`}
          >
            <option value="">Selecciona un tipo de documento</option>
            <option value="Cedula de ciudadanía">Cédula de ciudadanía</option>
            <option value="Cedula de extranjería">Cédula de extranjería</option>
          </select>
          {errors.identificationType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.identificationType}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="identificationNumber">
            Número de Identificación:
          </label>
          <input
            type="text"
            id="identificationNumber"
            name="identificationNumber"
            value={customerDetails.identificationNumber}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.identificationNumber ? "border-red-500" : "border"
            }`}
          />
          {errors.identificationNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.identificationNumber}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="gender">Género:</label>
          <select
            id="gender"
            name="gender"
            value={customerDetails.gender}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.gender ? "border-red-500" : "border"
            }`}
          >
            <option value="">Selecciona el género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="birthdate">Fecha de Nacimiento:</label>
          <input
            type="text"
            id="birthdate"
            name="birthdate"
            value={customerDetails.birthdate}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.birthdate ? "border-red-500" : "border"
            }`}
          />
          {errors.birthdate && (
            <p className="text-red-500 text-xs mt-1">{errors.birthdate}</p>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customerDetails.email}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.email ? "border-red-500" : "border"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="mobilePhone">Teléfono Móvil:</label>
          <input
            type="tel"
            id="mobilePhone"
            name="mobilePhone"
            value={customerDetails.mobilePhone}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.mobilePhone ? "border-red-500" : "border"
            }`}
          />
          {errors.mobilePhone && (
            <p className="text-red-500 text-xs mt-1">{errors.mobilePhone}</p>
          )}
        </div>
      </div>
      <div className="col-span-2 flex justify-center">
        <button
          onClick={handleConfirmPayment}
          className="relative inline-flex items-center space-x-2 px-6 py-2 border text-sm font-medium rounded-md text-white bg-tm10 hover:bg-customerSuperLigth"
        >
          <span>Confirmar Pago</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
