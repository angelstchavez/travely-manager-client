"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import SuccessModal from "../modals/success-modal";
import CustomTitleIcon from "../utils/icons/custom-title-icon";

function CustomerForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
    email: "",
    mobilePhone: "",
    dateOfBirth: "",
    gender: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

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

  const handleSubmit = async () => {
    const formErrors: { [key: string]: string } = {};

    // Validar que ningún campo esté vacío
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        formErrors[key] = "Este campo es obligatorio.";
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData = JSON.parse(cookieValue);
      const token = cookieData.data.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const currentDate = new Date();
      const createdAt = currentDate.toISOString();

      const requestData = {
        person: {
          names: formData.firstName,
          surnames: formData.lastName,
          identificationType: formData.documentType,
          identificationNumber: formData.documentNumber,
          gender: formData.gender,
          birthdate: formData.dateOfBirth,
          email: formData.email,
          mobilePhone: formData.mobilePhone,
          createdAt: createdAt,
        },
        createdAt: createdAt,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el cliente.");
      }

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(responseData.message || "Error al crear el cliente.");
      }

      setSuccessMessage("El cliente se creó satisfactoriamente.");
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <CustomTitleIcon icon="f7:person-2-alt" text="Registrar cliente" />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div>
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
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="mobilePhone"
            className="block text-sm font-medium text-gray-700"
          >
            Número de contacto
          </label>
          <input
            type="tel"
            id="mobilePhone"
            name="mobilePhone"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.mobilePhone ? "border-red-500" : "border-gray-300"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Número de contacto"
            value={formData.mobilePhone}
            onChange={handleInputChange}
            required
          />
          {errors.mobilePhone && (
            <p className="text-red-500 text-xs mt-1">{errors.mobilePhone}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Género
          </label>
          <select
            id="gender"
            name="gender"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.gender ? "border-red-500" : "border-gray-300"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end">
        <div className="relative flex-grow flex items-center">
          <button
            type="button"
            className="relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-tm10"
            onClick={handleSubmit}
          >
            <span>Crear</span>
          </button>
        </div>
      </div>
      {/* Mostrar errores generales */}
      {errors.general && (
        <p className="text-red-500 text-xs mt-4">{errors.general}</p>
      )}
      {/* Mostrar mensaje de éxito */}
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </section>
  );
}

export default CustomerForm;
