import React from "react";

interface ConfirmationModalProps {
  processText: string;
  onAccept: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  processText,
  onAccept,
  onCancel,
}) => {
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
            className="inline-block bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 active:bg-green-700 ml-2"
            onClick={onAccept}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
