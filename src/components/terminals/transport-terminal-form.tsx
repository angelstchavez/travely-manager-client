import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CustomTitleIcon from "../utils/icons/custom-title-icon";

interface Department {
  id: string;
  name: string;
}

interface City {
  id: number;
  name: string;
}

interface FormData {
  name: string;
  address: string;
  department: string;
  city: string;
  phoneNumber: string;
}

function TransportTerminalForm() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    department: "",
    city: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData = JSON.parse(cookieValue);
      const token = cookieData.data.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/deparment/get-all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los departamentos.");
      }

      const responseData = await response.json();

      if (!responseData.success || !responseData.data) {
        throw new Error("La respuesta no contiene datos válidos.");
      }

      setDepartments(responseData.data);
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  const fetchCities = async (departmentId: string) => {
    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData = JSON.parse(cookieValue);
      const token = cookieData.data.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/city/get-cities-by-deparment-id/${departmentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener las ciudades.");
      }

      const responseData = await response.json();

      if (!responseData.success || !responseData.data) {
        throw new Error("La respuesta no contiene datos válidos.");
      }

      setCities(responseData.data);
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDepartment = event.target.value;
    setSelectedDepartment(selectedDepartment);
    setSelectedCity("");
    setFormData({ ...formData, department: selectedDepartment, city: "" });
    if (selectedDepartment) {
      fetchCities(selectedDepartment);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    setFormData({ ...formData, city: selectedCity });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    let errorMessage = "";
    if (e.target.name === "phoneNumber") {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(e.target.value)) {
        errorMessage = "El número de teléfono debe tener 10 dígitos.";
      }
    } else {
      errorMessage =
        e.target.value.trim() === "" ? "Este campo es obligatorio." : "";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: errorMessage,
    }));
  };

  const handleSubmit = async () => {
    const formErrors: { [key: string]: string } = {};

    // Validar campos requeridos
    Object.entries(formData).forEach(([key, value]) => {
      let errorMessage = "";
      if (value.trim() === "") {
        errorMessage = "Este campo es obligatorio.";
      }
      if (key === "phoneNumber") {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
          errorMessage = "El número de teléfono debe tener 10 dígitos.";
        }
      }
      if (errorMessage) {
        formErrors[key] = errorMessage;
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData = JSON.parse(cookieValue);
      const token = cookieData.data.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const requestData = {
        name: formData.name,
        address: formData.address,
        cityId: parseInt(formData.city),
        phoneNumber: formData.phoneNumber,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/transport-terminal/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear la terminal.");
      }

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(responseData.message || "Error al crear la terminal.");
      }
      // Si la solicitud fue exitosa, mostramos el modal de éxito
      console.log("La terminal se creó satisfactoriamente.");
      // Limpia los campos y los errores después de la creación exitosa
      setFormData({
        name: "",
        address: "",
        department: "",
        city: "",
        phoneNumber: "",
      });
      setErrors({});
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <CustomTitleIcon
        icon="fluent:building-people-20-filled"
        text="Registrar terminal de transportre"
      />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Ingrese el nombre de la terminal"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
              errors.address ? "border-red-500" : ""
            }`}
            placeholder="Ingrese la dirección de la terminal"
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Departamento
          </label>
          <select
            id="department"
            name="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
              errors.department ? "border-red-500" : ""
            }`}
          >
            <option value="">Seleccione</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-500 text-xs mt-1">{errors.department}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            Ciudad
          </label>
          <select
            id="city"
            name="city"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedDepartment}
            className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
              errors.city ? "border-red-500" : ""
            }`}
          >
            <option value="">Seleccione</option>
            {cities.length > 0 &&
              cities.map((city) => (
                <option key={city.id} value={city.id.toString()}>
                  {city.name}
                </option>
              ))}
          </select>
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Número de Teléfono
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
            placeholder="Ingrese el número de teléfono de la terminal"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end">
        <div className="relative flex-grow flex items-center">
          <button
            type="button"
            className="relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-tm10"
            onClick={handleSubmit}
          >
            <span>Crear</span>
          </button>
        </div>
      </div>
      {errors.general && (
        <p className="text-red-500 text-xs mt-4">{errors.general}</p>
      )}
    </section>
  );
}

export default TransportTerminalForm;
