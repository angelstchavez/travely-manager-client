import React, { useState, useEffect, ChangeEvent } from "react";
import Cookies from "js-cookie";
import TotalSale from "../utils/sale/total-sale";
import TripDetails from "../utils/sale/trip-detail";
import SelectedSeatsDisplay from "../utils/sale/selected-seat";

interface PaymentMethod {
  id: number;
  name: string;
}

interface SaleRegistrationProps {
  formData: any;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  tripId: number;
  seatCount: number;
  selectedSeatIds: { id: string; number: number }[];
}

const SaleRegistration: React.FC<SaleRegistrationProps> = ({
  formData,
  handleChange,
  tripId,
  seatCount,
  selectedSeatIds,
}) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [genders, setGenders] = useState<string[]>(["Masculino", "Femenino"]);
  const [documentTypes, setDocumentTypes] = useState<string[]>([
    "Cedula de ciudadanía",
    "Pasaporte",
    "Otro",
  ]);

  useEffect(() => {
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

    fetchPaymentMethods();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <div className="lg:w-2/5">
        <div>
          <TripDetails tripId={tripId} />
        </div>
        <div>
          <SelectedSeatsDisplay selectedSeatIds={selectedSeatIds} />
        </div>
        <div>
          <TotalSale count={seatCount} tripId={tripId}></TotalSale>
        </div>
      </div>
      <div className="lg:w-3/5 lg:ml-4">
        <h2 className="font-semibold text-xl mb-4">Registro de Venta</h2>
        <div className="mb-4">
          <label className="font-semibold block">Nombres:</label>
          <input
            type="text"
            name="names"
            placeholder="Ingrese el nombre"
            onChange={handleChange}
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold block">Apellidos:</label>
          <input
            type="text"
            name="surnames"
            placeholder="Ingrese los apellidos"
            onChange={handleChange}
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold block">Tipo de Identificación:</label>
          <select
            name="identificationType"
            onChange={handleChange}
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
          >
            {documentTypes.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="font-semibold block">
            Número de Identificación:
          </label>
          <input
            type="text"
            name="identificationNumber"
            placeholder="Ingrese el número de identificación"
            onChange={handleChange}
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold block">Género:</label>
          <select
            name="gender"
            onChange={handleChange}
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
          >
            {genders.map((genero, index) => (
              <option key={index} value={genero}>
                {genero}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="font-semibold block">Fecha de Nacimiento:</label>
          <input
            type="date"
            name="birthdate"
            onChange={handleChange}
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold block">Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            placeholder="Ingrese el correo electrónico"
            onChange={handleChange}
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold block">Teléfono Móvil:</label>
          <input
            type="text"
            name="mobilePhone"
            placeholder="Ingrese el teléfono"
            onChange={handleChange}
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold block">Método de Pago:</label>
          <select
            name="paymentMethodId"
            onChange={handleChange}
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
          >
            {paymentMethods.map((metodo) => (
              <option key={metodo.id} value={metodo.id}>
                {metodo.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="font-semibold block">
            Monto Pagado por el Cliente:
          </label>
          <input
            type="number"
            name="amountGivenByCustomer"
            placeholder="Monto pagado"
            onChange={handleChange}
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default SaleRegistration;
