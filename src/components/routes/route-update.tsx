/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface TravelRoute {
  id: number;
  departureCity: City;
  destinationCity: City;
  durationHours: number;
  distanceKilometers: number;
  deparment: Department;
}

interface Department {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
}

interface UpdateTravelRouteProps {
  travelRoute: TravelRoute;
  onClose: () => void;
  onConfirm: (updateTravelRouteData: TravelRoute) => Promise<void>;
}

function TravelRouteUpdate({ travelRoute, onClose }: UpdateTravelRouteProps) {
  const [deaptureDepartments, setDeaptureDepartments] = useState<Department[]>(
    []
  );
  const [destinationDepartments, setDestinationDepartments] = useState<
    Department[]
  >([]);
  const [deaptureCities, setDeaptureCitites] = useState<City[]>([]);
  const [destinationCities, setDestinationCities] = useState<City[]>([]);
  const [selectedDeaptureDepartment, setSelectedDeaptureDepartment] =
    useState<string>("");
  const [selectedDestinationDepartment, setSelectedDestinationDepartment] =
    useState<string>("");
  const [selectedDeaptureCity, setSelectedDeaptureCity] = useState<string>("");
  const [selectedDestinationCity, setSelectedDestinationCity] =
    useState<string>("");
  const [formData, setFormData] = useState({
    durationHours: travelRoute.durationHours.toString(),
    distanceKilometers: travelRoute.distanceKilometers.toString(),
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    fetchDeaptureDepartments();
    fetchDestinationDepartments();
  }, []);

  const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
  const cookieData = JSON.parse(cookieValue);
  const token = cookieData.data.token;

  const fetchDeaptureDepartments = async () => {
    try {
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
        throw new Error("Error al obtener los departamentos de origen.");
      }

      const responseData = await response.json();

      if (!responseData.success || !responseData.data) {
        throw new Error("La respuesta no contiene datos válidos.");
      }

      setDeaptureDepartments(responseData.data);

      if (travelRoute.deparment) {
        setSelectedDeaptureDepartment(travelRoute.deparment.id);
        setSelectedDeaptureCity(travelRoute.departureCity.id);
        fetchDeaptureCities(travelRoute.deparment.id);
      }
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  const fetchDeaptureCities = async (departmentId: string) => {
    try {
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
        throw new Error("Error al obtener los modelos de vehículos.");
      }
      const responseData = await response.json();

      if (!responseData.success || !responseData.data) {
        throw new Error("La respuesta no contiene datos válidos.");
      }

      setDeaptureCitites(responseData.data);
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  const fetchDestinationDepartments = async () => {
    try {
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
        throw new Error("Error al obtener los departamentos de destino.");
      }

      const responseData = await response.json();

      if (!responseData.success || !responseData.data) {
        throw new Error("La respuesta no contiene datos válidos.");
      }

      setDestinationDepartments(responseData.data);
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  const fetchDestinationCities = async (departmentId: string) => {
    try {
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
        throw new Error("Error al obtener las ciudades de destino.");
      }

      const responseData = await response.json();

      if (!responseData.success || !responseData.data) {
        throw new Error("La respuesta no contiene datos válidos.");
      }

      setDestinationCities(responseData.data);
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  const handleDeaptureDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDeaptureDeparment = event.target.value;
    setSelectedDeaptureDepartment(selectedDeaptureDeparment);
    setSelectedDeaptureCity("");
    if (selectedDeaptureDeparment) {
      fetchDeaptureCities(selectedDeaptureDeparment);
    } else {
      setDeaptureCitites([]);
    }
  };

  const handleDeaptureCityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDeapureCyty = event.target.value;
    setSelectedDeaptureCity(selectedDeapureCyty);
  };

  const handleDestinationDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDestinationDeparment = event.target.value;
    setSelectedDestinationDepartment(selectedDestinationDeparment);
    setSelectedDestinationCity("");
    if (selectedDestinationDeparment) {
      fetchDestinationCities(selectedDestinationDeparment);
    } else {
      setDeaptureCitites([]);
    }
  };

  const handleDestinationCityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDstinationCyty = event.target.value;
    setSelectedDestinationCity(selectedDstinationCyty);
  };

  const handleTripDurationHoursChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      durationHours: event.target.value,
    });
  };

  const handleDistanceKilometersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      distanceKilometers: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const formErrors: { [key: string]: string } = {};

    if (!selectedDeaptureDepartment) {
      formErrors["originDepartment"] = "Seleccione un departamento de origen.";
    }

    if (!selectedDeaptureCity) {
      formErrors["originCity"] = "Seleccione una ciudad de origen.";
    }

    if (!selectedDestinationDepartment) {
      formErrors["destinationDepartment"] =
        "Seleccione un departamento de destino.";
    }

    if (!selectedDestinationCity) {
      formErrors["destinationCity"] = "Seleccione una ciudad de destino.";
    }

    if (
      !formData.durationHours ||
      isNaN(parseInt(formData.durationHours)) ||
      parseInt(formData.durationHours) <= 0
    ) {
      formErrors["durationHours"] = "Ingrese una duración válida en horas.";
    }

    if (
      !formData.distanceKilometers ||
      isNaN(parseInt(formData.distanceKilometers)) ||
      parseInt(formData.distanceKilometers) <= 0
    ) {
      formErrors["distanceKilometers"] =
        "Ingrese una distancia válida en kilómetros.";
    }

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/travel-route/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            id: travelRoute.id,
            departureCityId: selectedDeaptureCity,
            destinationCityId: selectedDestinationCity,
            durationHours: parseInt(formData.durationHours),
            distanceKilometers: parseInt(formData.distanceKilometers),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la ruta de viaje.");
      }

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(
          responseData.message || "Error al actualizar la ruta de viaje."
        );
      }

      setSuccessMessage("La ruta de viaje se actualizó satisfactoriamente.");
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-tm90 bg-opacity-50 flex items-center justify-center">
      <section className="border rounded p-4 my-4 bg-white">
        <h2 className="text-lg font-semibold">Gestor de Rutas</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="originDepartment"
              className="block text-sm font-medium text-gray-700"
            >
              Departamento Origen
            </label>
            <select
              id="originDepartment"
              name="originDepartment"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.originDepartment ? "border-red-500" : ""
              }`}
              onChange={handleDeaptureDepartmentChange}
              value={selectedDeaptureDepartment}
            >
              <option value="">Seleccione</option>
              {deaptureDepartments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            {errors.originDepartment && (
              <p className="text-red-500 text-xs mt-1">
                {errors.originDepartment}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="originCity"
              className="block text-sm font-medium text-gray-700"
            >
              Ciudad Origen
            </label>
            <select
              id="originCity"
              name="originCity"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.originCity ? "border-red-500" : ""
              }`}
              value={selectedDeaptureCity}
              disabled={!selectedDeaptureDepartment}
              onChange={handleDeaptureCityChange}
            >
              <option value="">Seleccione</option>
              {deaptureCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.originCity && (
              <p className="text-red-500 text-xs mt-1">{errors.originCity}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="destinationDepartment"
              className="block text-sm font-medium text-gray-700"
            >
              Departamento Destino
            </label>
            <select
              id="destinationDepartment"
              name="destinationDepartment"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.destinationDepartment ? "border-red-500" : ""
              }`}
              onChange={handleDestinationDepartmentChange}
              value={selectedDestinationDepartment}
            >
              <option value="">Seleccione</option>
              {destinationDepartments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            {errors.destinationDepartment && (
              <p className="text-red-500 text-xs mt-1">
                {errors.destinationDepartment}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="destinationCity"
              className="block text-sm font-medium text-gray-700"
            >
              Ciudad Destino
            </label>
            <select
              id="destinationCity"
              name="destinationCity"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border
                text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                  errors.destinationCity ? "border-red-500" : ""
                }`}
              value={selectedDestinationCity}
              disabled={!selectedDestinationDepartment}
              onChange={handleDestinationCityChange}
            >
              <option value="">Seleccione</option>
              {destinationCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.destinationCity && (
              <p className="text-red-500 text-xs mt-1">
                {errors.destinationCity}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="durationHours"
              className="block text-sm font-medium text-gray-700"
            >
              Duración del Viaje (Horas)
            </label>
            <input
              type="number"
              id="durationHours"
              name="durationHours"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.durationHours ? "border-red-500" : ""
              }`}
              placeholder="Ingrese la duración del viaje"
              value={formData.durationHours}
              onChange={handleTripDurationHoursChange}
              min="0"
              step="1"
            />
            {errors.durationHours && (
              <p className="text-red-500 text-xs mt-1">
                {errors.durationHours}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="distanceKilometers"
              className="block text-sm font-medium text-gray-700"
            >
              Distancia (km)
            </label>
            <input
              type="number"
              id="distanceKilometers"
              name="distanceKilometers"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.distanceKilometers ? "border-red-500" : ""
              }`}
              placeholder="Ingrese la distancia"
              value={formData.distanceKilometers}
              onChange={handleDistanceKilometersChange}
            />
            {errors.distanceKilometers && (
              <p className="text-red-500 text-xs mt-1">
                {errors.distanceKilometers}
              </p>
            )}
          </div>
        </div>
        {errors.general && (
          <p className="text-red-500 text-xs mt-4">{errors.general}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-xs mt-4">{successMessage}</p>
        )}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleSubmit}
          >
            Confirmar
          </button>
          <button
            type="button"
            className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border
            -transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </section>
    </div>
  );
}
export default TravelRouteUpdate;
