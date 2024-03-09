import React from "react";

function VehicleTab() {
  return (
    <div>
      {/* Primera sección: Formulario */}
      <section className="border rounded p-4 my-4 bg-white">
        <h2 className="text-lg font-semibold">Gestor de Vehículos</h2>
        {/* Inputs del formulario */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="licensePlate"
              className="block text-sm font-medium text-gray-700"
            >
              Placa
            </label>
            <input
              type="text"
              id="licensePlate"
              name="licensePlate"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              placeholder="Ingrese la placa del vehículo"
            />
          </div>
          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <select
              id="color"
              name="color"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <option value="">Seleccione</option>
              <option value="rojo">Rojo</option>
              <option value="azul">Azul</option>
              <option value="verde">Verde</option>
              <option value="amarillo">Rojo</option>
              <option value="blanco">Blanco</option>
              <option value="negro">Negro</option>
              {/* Agrega más opciones de colores según sea necesario */}
            </select>
          </div>
          <div>
            <label
              htmlFor="manufactureYear"
              className="block text-sm font-medium text-gray-700"
            >
              Año de Fabricación
            </label>
            <input
              type="number"
              id="manufactureYear"
              name="manufactureYear"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              placeholder="Ingrese el año de fabricación"
            />
          </div>
          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Moledelo
            </label>
            <select
              id="model"
              name="model"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-nonesm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              {/* Opciones de marca */}
              <option value="">Seleccione</option>
              <option value="Mercedes-Benz Citaro">Mercedes-Benz Citaro</option>
              <option value="Volvo 9700">Volvo 9700</option>
              <option value="Scania Interlink">Scania Interlink</option>
              <option value="MAN Lion's Coach">MAN Lions Coach</option>
              <option value="Iveco Crossway">Iveco Crossway</option>
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
        <h2 className="text-lg font-semibold">Lista de Vehículos</h2>
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

export default VehicleTab;
