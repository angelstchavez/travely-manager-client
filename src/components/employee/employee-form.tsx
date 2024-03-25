import React, { useState } from "react";

function EmployeeForm() {
  const [identificationType, setIdentificationType] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleIdentificationTypeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setIdentificationType(event.target.value);
  };

  const handleDateChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBirthDate(event.target.value);
  };

  const handleContactNumberChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setContactNumber(event.target.value);
  };
  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold">Registro de Empleados</h2>
      {/* Inputs del formulario */}
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
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Ingrese los nombres"
          />
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
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Ingrese los apellidos"
          />
        </div>
        <div>
          <label
            htmlFor="identification"
            className="block text-sm font-medium text-gray-700"
          >
            Identificación
          </label>
          <input
            type="text"
            id="identification"
            name="identification"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Ingrese la identificación"
          />
        </div>
        <div>
          <label
            htmlFor="idType"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Identificación
          </label>
          <select
            id="idType"
            name="idType"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <option value="">Seleccione</option>
            <option value="cédula">Cédula</option>
            <option value="pasaporte">Pasaporte</option>
            <option value="tarjeta de identidad">Tarjeta de Identidad</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
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
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="example@travely.com"
          />
        </div>

        <div>
          <label
            htmlFor="birthDate"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={birthDate}
            onChange={handleDateChange}
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          />
        </div>
        <div>
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Número de Contacto
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={contactNumber}
            onChange={handleContactNumberChange}
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Ingrese un número"
          />
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Rol
          </label>
          <select
            id="role"
            name="role"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-nonesm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <option value="">Seleccione</option>
            <option value="Conductor">Conductor</option>
            <option value="Vendedor">Vendedor</option>
            {/* Opciones de marca */}
          </select>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end">
        <div className="relative flex-grow flex items-center">
          <button
            type="button"
            className="ml-1 relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <span>Crear</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default EmployeeForm;
