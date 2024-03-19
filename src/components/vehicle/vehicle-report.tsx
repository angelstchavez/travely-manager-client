import React from "react";

function VehicleReport() {
  return (
    <section className="border rounded p-4 my-4 flex justify-end bg-white">
      <button
        type="button"
        className="relative inline-flex items-center space-x-2 px-6 py-2 border text-sm font-medium rounded-md text-customGreen bg-customBlueLigth hover:bg-customerSuperLigth"
      >
        <span>Descargar PDF</span>
      </button>
    </section>
  );
}

export default VehicleReport;
