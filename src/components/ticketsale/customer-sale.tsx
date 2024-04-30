import React, { useState, useEffect, ChangeEvent } from "react";
import Cookies from "js-cookie";
import TotalSale from "../utils/sale/total-sale";
import TripDetails from "../utils/sale/trip-detail";
import SelectedSeatsDisplay from "../utils/sale/selected-seat";
import PaymentMethodButton from "../utils/payment-method-button";

interface PaymentMethod {
  id: number;
  name: string;
  imageUrl: string;
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
  const [genders, setGenders] = useState<string[]>(["Masculino", "Femenino"]);
  const [documentTypes, setDocumentTypes] = useState<string[]>([
    "Cedula de ciudadanía",
    "Cedula de extranjería",
    "Pasaporte",
    "Otro",
  ]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(null);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, name: "Efectivo", imageUrl: "" },
    { id: 2, name: "Tarjeta de crédito", imageUrl: "" },
    { id: 3, name: "Tarjeta de débito", imageUrl: "" },
    { id: 4, name: "Transferencia bancaria", imageUrl: "" },
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

        const data: PaymentMethod[] = responseData.data.map((method: any) => ({
          id: method.id,
          name: method.name,
          imageUrl: method.imageUrl, // Asegúrate de tener la propiedad imageUrl en la respuesta del servidor
        }));
        setPaymentMethods(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const paymentMethodImages = [
    "https://cdn-icons-png.flaticon.com/512/639/639365.png",
    "https://cdn-icons-png.flaticon.com/512/2695/2695969.png",
    "https://cdn-icons-png.flaticon.com/512/3344/3344907.png",
    "https://cdn-icons-png.flaticon.com/512/1473/1473496.png",
  ];

  const handlePaymentMethodClick = (methodId: number) => {
    setSelectedPaymentMethod(methodId);
    handleChange({
      target: { name: "paymentMethodId", value: methodId },
    } as unknown as ChangeEvent<HTMLInputElement>);
  };

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
            required
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
            defaultValue="" // Establecer el valor predeterminado como vacío
          >
            <option value="" disabled hidden>
              Seleccione...
            </option>{" "}
            {/* Opción deshabilitada y oculta */}
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
            defaultValue="" // Establecer el valor predeterminado como vacío
          >
            <option value="" disabled hidden>
              Seleccione...
            </option>{" "}
            {/* Opción deshabilitada y oculta */}
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
          <div className="mt-1 flex flex-wrap gap-4">
            {paymentMethods.map((metodo, index) => (
              <PaymentMethodButton
                key={metodo.id}
                name={metodo.name}
                imageUrl={paymentMethodImages[index]}
                onClick={() => handlePaymentMethodClick(metodo.id)}
                selected={selectedPaymentMethod === metodo.id}
              />
            ))}
          </div>
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
