import React, { useState } from "react";

interface PassengerFormProps {
  seatNumber: number;
  onSubmit: (passenger: Passenger) => void;
}

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
}

const PassengerForm: React.FC<PassengerFormProps> = ({
  seatNumber,
  onSubmit,
}) => {
  const [passenger, setPassenger] = useState<Passenger>({
    name: "",
    surname: "",
    documentType: "",
    documentNumber: "",
    email: "",
    seat: {
      id: "",
      number: seatNumber,
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registered, setRegistered] = useState(false); // Estado para indicar si el pasajero ya fue registrado
  const [editMode, setEditMode] = useState(true); // Estado para controlar el modo de edición del formulario

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
      setRegistered(true); // Cambiar el estado a true cuando se registra el pasajero
      setEditMode(false); // Cambiar el modo de edición a false después de registrar al pasajero
    }
  };

  const handleReset = () => {
    // Restablecer los campos del formulario y volver al modo de edición
    setPassenger({
      name: "",
      surname: "",
      documentType: "",
      documentNumber: "",
      email: "",
      seat: {
        id: "",
        number: seatNumber,
      },
    });
    setErrors({});
    setRegistered(false);
    setEditMode(true);
  };

  return (
    <div className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold">
        Pasajero del asiento: {seatNumber}
      </h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
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
            Apellido
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
          <label
            htmlFor="documentType"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Documento
          </label>
          <input
            type="text"
            id="documentType"
            name="documentType"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.documentType ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el tipo de documento"
            value={passenger.documentType}
            onChange={handleInputChange}
            maxLength={50}
            required
          />
          {errors.documentType && (
            <p className="text-red-500 text-xs mt-1">{errors.documentType}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="documentNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Número de Documento
          </label>
          <input
            type="text"
            id="documentNumber"
            name="documentNumber"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.documentNumber ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el número de documento"
            value={passenger.documentNumber}
            onChange={handleInputChange}
            maxLength={50}
            required
          />
          {errors.documentNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.documentNumber}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.email ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el correo electrónico"
            value={passenger.email}
            onChange={handleInputChange}
            maxLength={50}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
