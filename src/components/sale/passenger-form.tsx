import React, { useState } from "react";
import CustomTitleIcon from "../utils/icons/custom-title-icon";
import { SelectComponent } from "../ui";
import { opcionesTI } from "@/types";

interface PassengerFormProps {
  seatNumber: number;
  onSubmit: (passenger: Passenger) => void;
}

interface Passenger {
  name: string;
  surname: string;
  identificationType: string;
  identificationNumber: string;
}

const PassengerForm: React.FC<PassengerFormProps> = ({
  seatNumber,
  onSubmit,
}) => {
  const [passenger, setPassenger] = useState<Passenger>({
    name: "",
    surname: "",
    identificationType: "",
    identificationNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registered, setRegistered] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = () => {
    const formErrors: Record<string, string> = {};
    Object.entries(passenger).forEach(([key, value]) => {
      if (typeof value === "string" && value.trim() === "") {
        formErrors[key] = "Este campo es obligatorio.";
      }
    });
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      onSubmit(passenger);
      setRegistered(true);
      setEditMode(false);
    }
  };

  const handleReset = () => {
    setPassenger({
      name: "",
      surname: "",
      identificationType: "",
      identificationNumber: "",
    });
    setErrors({});
    setRegistered(false);
    setEditMode(true);
  };

  return (
    <div className="border border-zinc-400 rounded p-4 my-4 bg-zinc-50">
      <CustomTitleIcon
        icon="bi:card-list"
        text={`Pasajero del asiento: ${seatNumber}`}
      />

      <div className="mt-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombres
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.name ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el nombre"
            value={passenger.name}
            onChange={handleInputChange}
            maxLength={50}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="surname"
            className="block text-sm font-medium text-gray-700"
          >
            Apellidos
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.surname ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el apellido"
            value={passenger.surname}
            onChange={handleInputChange}
            maxLength={50}
            required
          />
          {errors.surname && (
            <p className="text-red-500 text-xs mt-1">{errors.surname}</p>
          )}
        </div>
        <div>
          <SelectComponent
            name="identificationType"
            label="Tipo de indentificación"
            options={opcionesTI}
          />
        </div>
        <div>
          <label
            htmlFor="identificationNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Número de Documento
          </label>
          <input
            type="text"
            id="identificationNumber"
            name="identificationNumber"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.documentNumber ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el número de documento"
            value={passenger.identificationNumber}
            onChange={handleInputChange}
            maxLength={50}
            required
          />
          {errors.documentNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.documentNumber}</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        {editMode ? (
          <button
            type="button"
            className={`relative inline-flex items-center space-x-2 px-6 py-2 border text-sm font-medium rounded-md text-white bg-tm10 hover:bg-customerSuperLigth`}
            onClick={handleSubmit}
          >
            <span>
              {registered ? "Pasajero Registrado" : "Registrar Pasajero"}
            </span>
          </button>
        ) : (
          <button
            type="button"
            className={`relative inline-flex items-center space-x-2 px-6 py-2 border text-sm font-medium rounded-md text-white bg-gray-400 cursor-not-allowed`}
            disabled
          >
            <span>Pasajero Registrado</span>
          </button>
        )}
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
    </div>
  );
};

export default PassengerForm;
