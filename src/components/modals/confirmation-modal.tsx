import React from "react";

interface ConfirmationModalProps {
  processText: string;
  onAccept: () => void;
  onCancel: () => void;
  actionType: "delete" | "register"; // Nuevo prop para definir el tipo de acción
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  processText,
  onAccept,
  onCancel,
  actionType,
}) => {
  const getButtonColor = () => {
    return actionType === "delete"
      ? "bg-red-600 hover:bg-red-700 active:bg-red-700"
      : "bg-green-600 hover:bg-green-700 active:bg-green-700";
  };

  const getButtonText = () => {
    return actionType === "delete" ? "Eliminar" : "Registrar";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg p-6 mx-5 max-w-md">
        <div className="text-center">
          <h2 className="mt-4 text-lg font-semibold">Confirmación</h2>
          <p className="mt-2 text-sm text-gray-600">¿Desea {processText}?</p>
        </div>
        <div className="mt-6 text-center">
          <button
            type="button"
            className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-300 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200 active:bg-gray-300"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={`inline-block ${getButtonColor()} text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 active:bg-green-700 ml-2`}
            onClick={onAccept}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
