import React from "react";

interface SuccessModalProps {
  successMessage: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ successMessage }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 mx-5 max-w-md">
        <div className="text-center">
          <h2 className="mt-4 text-lg md:text-xl font-semibold">Éxito</h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            {successMessage}
          </p>
        </div>
        <div className="mt-6 text-center">
          <button
            type="button"
            className="inline-block bg-green-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base font-semibold hover:bg-green-500 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 active:bg-green-700"
            onClick={() => {
              // Aquí puedes manejar el comportamiento deseado al cerrar el modal de éxito
              // Por ejemplo, puedes redirigir a otra página o hacer cualquier otra acción
              // En este caso, simplemente recargamos la página actual
              window.location.reload();
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
