import React, { useState } from "react";
import CustomTitleIcon from "../utils/icons/custom-title-icon";

interface Passenger {
  names: string;
  surnames: string;
  identificationType: string;
  identificationNumber: string;
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
    names: "",
    surnames: "",
    identificationType: "",
    identificationNumber: "",
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
      onAddPassengers([passenger]); // Cambia aquí para enviar la lista de pasajeros correctamente
      setRegistered(true);
      return true;
    }
    return false;
  };

  const handleReset = () => {
    setPassenger({
      names: "",
      surnames: "",
      identificationType: "",
      identificationNumber: "",
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
            htmlFor="names"
            className="block text-sm font-medium text-gray-700"
          >
            Nombres:
          </label>
          <input
            type="text"
            id="names"
            name="names"
            value={passenger.names}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.names ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el nombre"
            maxLength={50}
            required
            disabled={registered}
          />
          {errors.names && (
            <p className="text-red-500 text-xs mt-1">{errors.names}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="surnames"
            className="block text-sm font-medium text-gray-700"
          >
            Apellidos:
          </label>
          <input
            type="text"
            id="surnames"
            name="surnames"
            value={passenger.surnames}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.surnames ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el apellido"
            maxLength={50}
            required
            disabled={registered}
          />
          {errors.surnames && (
            <p className="text-red-500 text-xs mt-1">{errors.surnames}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="identificationType"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Documento:
          </label>
          <select
            id="identificationType"
            name="identificationType"
            value={passenger.identificationType}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.identificationType ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            required
            disabled={registered}
          >
            <option value="">Seleccione...</option>
            <option value="Cedula de ciudadanía">Cedula de ciudadanía</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.identificationType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.identificationType}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="identificationNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Número de Documento:
          </label>
          <input
            type="text"
            id="identificationNumber"
            name="identificationNumber"
            value={passenger.identificationNumber}
            onChange={handleInputChange}
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.identificationNumber ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el número de documento"
            maxLength={50}
            required
            disabled={registered}
          />
          {errors.identificationNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.identificationNumber}
            </p>
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
