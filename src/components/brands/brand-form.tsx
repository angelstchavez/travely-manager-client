import React, { useState } from "react";
import ConfirmationModal from "../modals/confirmation-modal";

function BrandForm() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirm = () => {
    // Lógica para aceptar la creación de la marca de vehículo
    // Aquí puedes llamar a la API para realizar la acción deseada
    console.log("Marca de vehículo creada");
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    // Lógica para cancelar la creación de la marca de vehículo
    console.log("Creación de marca de vehículo cancelada");
    setShowConfirmation(false);
  };

  return (
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
            onClick={() => setShowConfirmation(true)}
          >
            <span>Crear</span>
          </button>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          processText="crear la marca de vehículo"
          onAccept={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </section>
  );
}

export default BrandForm;
