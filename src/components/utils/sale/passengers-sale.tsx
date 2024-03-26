import React, { useState, useEffect } from "react";

interface PassengersSaleProps {
  seatId: string;
  seatNumber: number;
  selectedSeat: { id: string; number: number };
}

function PassengersSale({
  seatId,
  seatNumber,
  selectedSeat,
}: PassengersSaleProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // UseEffect para actualizar el estado del formulario cuando cambia el asiento seleccionado
  useEffect(() => {
    if (selectedSeat && selectedSeat.id === seatId) {
      setFormData({
        firstName: "",
        lastName: "",
        documentType: "",
        documentNumber: "",
        email: "",
      });
      setErrors({});
    }
  }, [selectedSeat, seatId]);

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
        errorMessage = "Entre 7 y 10 dígitos numéricos.";
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
      <div className="mt-2 flex justify-center">
        <div className="border rounded p-2 bg-zinc-100">
          <div className="justify-center text-center bg-tm10 text-white font-bold py-1 rounded">
            Asiento {seatNumber}
          </div>{" "}
          {/* Muestra el número de asiento */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
            <div className="mt-1 sm:mb-0">
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
                className={`w-full border focus:outline-none sm:text-sm rounded-md ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } px-2 py-1 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50`}
                placeholder="Nombre(s)"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="mt-1 sm:mb-0">
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
                className={`w-full border focus:outline-none sm:text-sm rounded-md ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } px-3 py-1 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50`}
                placeholder="Apellido(s)"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
            <div className="mt-1 sm:mb-0">
              <label
                htmlFor="documentType"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de documento
              </label>
              <select
                id="documentType"
                name="documentType"
                className={`w-full border focus:outline-none sm:text-sm rounded-md ${
                  errors.documentType ? "border-red-500" : "border-gray-300"
                } px-2 py-1 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50`}
                value={formData.documentType}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione</option>
                <option value="Cédula de Ciudadanía">
                  Cédula de Ciudadanía
                </option>
                <option value="Tarjeta de Identidad">
                  Tarjeta de Identidad
                </option>
                <option value="Cédula de Extranjería">
                  Cédula de Extranjería
                </option>
                {/* Agrega más opciones según sea necesario */}
              </select>
              {errors.documentType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.documentType}
                </p>
              )}
            </div>
            <div className="mt-1 sm:mb-0">
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
                className={`w-full border focus:outline-none sm:text-sm rounded-md ${
                  errors.documentNumber ? "border-red-500" : "border-gray-300"
                } px-3 py-1 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50`}
                placeholder="Número de documento"
                value={formData.documentNumber}
                onChange={handleInputChange}
                required
              />
              {errors.documentNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.documentNumber}
                </p>
              )}
            </div>
            <div className="mt-1 sm:mb-0">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full border focus:outline-none sm:text-sm rounded-md ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }  px-3 py-1 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50`}
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PassengersSale;
