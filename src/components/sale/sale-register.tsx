"use client"

import React from "react";

interface SaleRegisterProps {
  tripId: number;
}

const SaleRegister: React.FC<SaleRegisterProps> = ({ tripId }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-tm90 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 mx-5 max-w-md border">
        <h2 className="text-lg font-semibold">
          Registrar tiquete para el viaje {tripId}
        </h2>
      </div>
    </div>
  );
};

export default SaleRegister;
