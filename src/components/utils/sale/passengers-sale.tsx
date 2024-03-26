import React, { useState } from "react";

interface SelectedSeatsDisplayProps {
  selectedSeatIds: { id: string; number: number }[];
}

interface PassengersSaleProps {
  seatId: string;
  seatNumber: number;
}

function PassengersSale({ seatId, seatNumber }: PassengersSaleProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    let errorMessage = "";
    if (name === "documentNumber") {
      const documentRegex = /^[0-9]{7,10}$/;
      if (!documentRegex.test(value)) {
        errorMessage =
          "El número de documento debe contener entre 7 y 10 dígitos numéricos.";
      }
    } else if (name === "documentType") {
      if (value === "") {
        errorMessage = "Debe seleccionar un tipo de documento.";
      }
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = "Ingrese un correo electrónico válido.";
      }
    } else if (name === "mobilePhone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        errorMessage = "Ingrese un número de teléfono válido.";
      }
    } else if (name === "dateOfBirth") {
      const currentDate = new Date();
      const selectedDate = new Date(value);
      if (selectedDate > currentDate) {
        errorMessage = "La fecha de nacimiento no puede estar en el futuro.";
      }
    } else {
      errorMessage = value.trim() === "" ? "Este campo es obligatorio." : "";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  return (
    <>
      <div>Asiento {seatNumber}</div> {/* Muestra el número de asiento */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          Nombres
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
          placeholder="Nombre(s)"
          value={formData.firstName}
          onChange={handleInputChange}
          required
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
          Apellidos
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
          placeholder="Apellido(s)"
          value={formData.lastName}
          onChange={handleInputChange}
          required
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
          Tipo de documento
        </label>
        <select
          id="documentType"
          name="documentType"
          className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
            errors.documentType ? "border-red-500" : "border-gray-300"
          } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
          value={formData.documentType}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccione</option>
          <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
          <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
          <option value="Cédula de Extranjería">Cédula de Extranjería</option>
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
          Número de documento
        </label>
        <input
          type="text"
          id="documentNumber"
          name="documentNumber"
          className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
            errors.documentNumber ? "border-red-500" : "border-gray-300"
          } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
          placeholder="Número de documento"
          value={formData.documentNumber}
          onChange={handleInputChange}
          required
        />
        {errors.documentNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.documentNumber}</p>
        )}
      </div>
    </>
  );
}

export default PassengersSale;
