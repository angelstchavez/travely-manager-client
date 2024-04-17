import React, { useState } from "react";

interface CustomerDetailsProps {
  onCustomerDetailsChange: (details: any) => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  onCustomerDetailsChange,
}) => {
  const [customerDetails, setCustomerDetails] = useState({
    names: "",
    surnames: "",
    identificationType: "",
    identificationNumber: "",
    gender: "",
    birthdate: "",
    email: "",
    mobilePhone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    onCustomerDetailsChange(customerDetails);
  };

  return (
    <>
      <div>
        <h2 className="text-lg font-semibold">Detalles del cliente</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="names"
            className="block text-sm font-medium text-gray-700"
          >
            Nombres
          </label>
          <input
            type="text"
            id="names"
            name="names"
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
            placeholder="Ingrese los nombres del cliente"
            value={customerDetails.names}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="surnames"
            className="block text-sm font-medium text-gray-700"
          >
            Apellidos
          </label>
          <input
            type="text"
            id="surnames"
            name="surnames"
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
            placeholder="Ingrese los apellidos del cliente"
            value={customerDetails.surnames}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="identificationType"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Identificación
          </label>
          <input
            type="text"
            id="identificationType"
            name="identificationType"
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
            placeholder="Ingrese el tipo de identificación"
            value={customerDetails.identificationType}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="identificationNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Número de Identificación
          </label>
          <input
            type="text"
            id="identificationNumber"
            name="identificationNumber"
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
            placeholder="Ingrese el número de identificación"
            value={customerDetails.identificationNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Género
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
            placeholder="Ingrese el género"
            value={customerDetails.gender}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="birthdate"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Nacimiento
          </label>
          <input
            type="text"
            id="birthdate"
            name="birthdate"
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
            placeholder="Ingrese la fecha de nacimiento"
            value={customerDetails.birthdate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
            placeholder="Ingrese el correo electrónico"
            value={customerDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="mobilePhone"
            className="block text-sm font-medium text-gray-700"
          >
            Teléfono Móvil
          </label>
          <input
            type="text"
            id="mobilePhone"
            name="mobilePhone"
            className="w-full mt-1 border focus:outline-none sm:text-sm rounded-md border-gray-300 px-3 py-2"
            placeholder="Ingrese el teléfono móvil"
            value={customerDetails.mobilePhone}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
