import React from "react";

function ModelTab() {
  return (
    <div>
      {/* Primera sección: Formulario */}
      <section className="border rounded p-4 my-4 bg-white">
        <h2 className="text-lg font-semibold">
          Gestor de Modelos de Vehículos
        </h2>
        {/* Inputs adicionales */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-nonesm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              placeholder="Ingrese el nombre del modelo"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Categoría
            </label>
            <select
              id="category"
              name="category"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-nonesm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <option value="">Seleccione</option>
              <option value="compacto">Compacto</option>
              <option value="sedán">Sedán</option>
              <option value="SUV">SUV</option>
              <option value="autobús">Autobús</option>
              <option value="mini bus">Mini Bus</option>

              {/* Opciones de categoría */}
            </select>
          </div>
          <div>
            <label
              htmlFor="fuelType"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de Gasolina
            </label>
            <select
              id="fuelType"
              name="fuelType"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-nonesm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <option value="">Seleccione</option>
              <option value="gasolina regular">Gasolina Regular</option>
              <option value="gasolina premium">Gasolina Premium</option>
              <option value="diésel">Diésel</option>
              <option value="etanol">Etanol</option>
              <option value="gas natural">Gas Natural</option>
              {/* Opciones de tipo de gasolina */}
            </select>
          </div>
          <div>
            <label
              htmlFor="seatingCapacity"
              className="block text-sm font-medium text-gray-700"
            >
              Capacidad de Asientos
            </label>
            <input
              type="text"
              id="seatingCapacity"
              name="seatingCapacity"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-nonesm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              placeholder="Ingrese la cantidad de asientos"
            />
          </div>
          <div>
            <label
              htmlFor="transmissionType"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de Transmisión
            </label>
            <select
              id="transmissionType"
              name="transmissionType"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-nonesm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <option value="">Seleccione</option>
              <option value="manual">Manual</option>
              <option value="automática">Automática</option>
              {/* Opciones de tipo de transmisión */}
            </select>
          </div>
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Marca
            </label>
            <select
              id="brand"
              name="brand"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-nonesm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <option value="">Seleccione</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Volvo">Volvo</option>
              <option value="Scania">Scania</option>
              <option value="MAN">MAN</option>
              <option value="Iveco">Iveco</option>
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

      {/* Segunda sección: Tabla */}
      <section className="border rounded p-4 my-4 bg-white">
        <h2 className="text-lg font-semibold">Lista de Modelos de Vehículos</h2>
        {/* Aquí irá la tabla */}
      </section>

      {/* Tercera sección: Botón para descargar PDF */}
      <section className="border rounded p-4 my-4 flex justify-end bg-white">
        <button
          type="button"
          className="ml-1 relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <span>Descargar PDF</span>
        </button>
      </section>
    </div>
  );
}

export default ModelTab;
