import React from "react";

function BrandTab() {
  return (
    <div>
      {/* Primera sección: Formulario */}
      <section className="border rounded p-4 my-4 bg-white">
        <h2 className="text-lg font-semibold">Crear Marca de Vehículo</h2>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center">
          <div className="relative flex-grow flex items-center">
            <input
              type="text"
              id="brandName"
              name="brandName"
              className="block w-full sm:w-40 rounded-md border-0 py-1.5 pl-3 pr-10 sm:pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Nombre"
            />
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
        <h2 className="text-lg font-semibold">Lista de Marcas de Vehículos</h2>
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

export default BrandTab;
