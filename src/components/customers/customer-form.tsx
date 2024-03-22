import React from "react";

function CustomerForm() {
  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold">Información del Cliente</h2>
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
            placeholder="Nombre(s)"
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
            placeholder="Apellido(s)"
          />
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
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <option value="">Seleccione</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
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
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Número de documento"
          />
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
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Correo electrónico"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Número de contacto
          </label>
          <input
            type="tel"
            id="mobilePhone"
            name="mobilePhone"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Número de contacto"
          />
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
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          />
        </div>
        <div>
          <label
            htmlFor="documentType"
            className="block text-sm font-medium text-gray-700"
          >
            Género
          </label>
          <select
            id="documentType"
            name="documentType"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <option value="">Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end">
        <div className="relative flex-grow flex items-center">
          <button
            type="button"
            className="relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-tm10"
          >
            <span>Crear</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default CustomerForm;
