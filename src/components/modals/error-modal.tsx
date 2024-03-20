import React from "react";

interface ErrorModalProps {
  errorDescription: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorDescription }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-tm80 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 mx-5 max-w-md">
        <div className="text-center">
          <h2 className="mt-4 text-lg md:text-xl font-semibold">Error</h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            {errorDescription}
          </p>
        </div>
        <div className="mt-6 text-center">
          <button
            type="button"
            className="inline-block bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base font-semibold hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 active:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
