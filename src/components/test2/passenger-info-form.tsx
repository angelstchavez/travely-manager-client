import React, { useState } from "react";
import CustomTitleIcon from "../utils/icons/custom-title-icon";

interface Passenger {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
}

interface Props {
  onAddPassengers: (passengers: Passenger[]) => void;
  seatNumber: string;
}

const PassengerInfoForm: React.FC<Props> = ({
  onAddPassengers,
  seatNumber,
}) => {
  const [passenger, setPassenger] = useState<Passenger>({
    firstName: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registered, setRegistered] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPassenger((prevPassenger) => ({
      ...prevPassenger,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "" ? "Este campo es obligatorio." : "",
    }));
  };

  const handleAddPassenger = (): boolean => {
    const formErrors: Record<string, string> = {};
    Object.entries(passenger).forEach(([key, value]) => {
      if (typeof value === "string" && value.trim() === "") {
        formErrors[key] = "Este campo es obligatorio.";
      }
    });
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      onAddPassengers([passenger]);
      setRegistered(true);
      return true;
    }
    return false;
  };

  const handleReset = () => {
    setPassenger({
      firstName: "",
      lastName: "",
      documentType: "",
      documentNumber: "",
    });
    setErrors({});
    setRegistered(false);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleAddPassenger();
      }}
      className="border border-zinc-00 rounded p-4 my-4 bg-zinc-50"
    >
      <CustomTitleIcon
        icon="bi:card-list"
        text={`Pasajero del asiento: ${seatNumber}`}
      />

      <div className="mt-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            Nombres:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={passenger.firstName}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.firstName ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el nombre"
            maxLength={50}
            required
            disabled={registered}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Apellidos:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={passenger.lastName}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.lastName ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el apellido"
            maxLength={50}
            required
            disabled={registered}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="documentType"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Documento:
          </label>
          <select
            id="documentType"
            name="documentType"
            value={passenger.documentType}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.documentType ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            required
            disabled={registered}
          >
            <option value="">Seleccione...</option>
            <option value="DNI">DNI</option>
            <option value="Pasaporte">Pasaporte</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
          {errors.documentType && (
            <p className="text-red-500 text-xs mt-1">{errors.documentType}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="documentNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Número de Documento:
          </label>
          <input
            type="text"
            id="documentNumber"
            name="documentNumber"
            value={passenger.documentNumber}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.documentNumber ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el número de documento"
            maxLength={50}
            required
            disabled={registered}
          />
          {errors.documentNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.documentNumber}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className={`relative inline-flex items-center space-x-2 px-6 py-2 border text-sm font-medium rounded-md text-white bg-tm10 hover:bg-customerSuperLigth`}
          disabled={registered}
        >
          <span>
            {registered ? "Pasajero Registrado" : "Registrar Pasajero"}
          </span>
        </button>
        {registered && (
          <button
            type="button"
            className={`relative inline-flex items-center space-x-2 px-6 py-2 border text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 ml-2`}
            onClick={handleReset}
          >
            <span>Restablecer</span>
          </button>
        )}
      </div>
    </form>
  );
};

export default PassengerInfoForm;
