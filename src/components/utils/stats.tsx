// eslint-disable-next-line react-hooks/rules-of-hooks

"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";

import BoxStat from "./box-stats";
import CustomTitleIcon from "./icons/custom-title-icon";

interface Record {
  key: string;
  value: number;
}

function Stats(): JSX.Element {
  const [data, setData] = useState<Record[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData = JSON.parse(cookieValue);
      const token = cookieData?.data?.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/record/total-count`,
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

      setData(responseData.data);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <div className="bg-white rounded-xl p-3 border border-zinc-200">
      <div className="mb-4">
        <CustomTitleIcon
          icon={""}
          text={"Registros Históricos"}
        ></CustomTitleIcon>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {data.map((item: Record, index: number) => (
          <BoxStat
            key={index}
            cantidad={item.value}
            title={item.key}
            // Puedes cambiar el icono dependiendo de la entidad
            icon={getIcon(item.key)}
          />
        ))}
      </div>
    </div>
  );
}

// Función para obtener el icono correspondiente según el tipo de registro
const getIcon = (key: string): JSX.Element => {
  switch (key) {
    case "Vehiculos":
      return <Icon icon="mdi:car" />;
    case "Marcas":
      return <Icon icon="mdi:tag" />;
    case "Asignaciones":
      return <Icon icon="mdi:assignment" />;
    case "Modelos":
      return <Icon icon="game-icons:car-door" />;
    case "Clientes":
      return <Icon icon="mdi:account-group" />;
    case "Empleados":
      return <Icon icon="mdi:account-tie" />;
    case "Pasajeros":
      return <Icon icon="mdi:account" />;
    case "Terminales":
      return <Icon icon="gis:signpost" />;
    case "Rutas de viaje":
      return <Icon icon="mdi:map-marker-path" />;
    case "Reservas":
      return <Icon icon="mdi:calendar-check" />;
    case "Viajes":
      return <Icon icon="mdi:bus" />;
    case "Ventas":
      return <Icon icon="mdi:shopping" />;
    case "Ticketes vendidos":
      return <Icon icon="mdi:ticket" />;
    case "Usuarios":
      return <Icon icon="mdi:account-circle" />;
    case "Conductores":
      return <Icon icon="mdi:car-connected" />;
    case "Vendedores":
      return <Icon icon="mdi:cart" />;
    default:
      return <Icon icon="mdi:alert" />; // Icono por defecto si no se encuentra un tipo de registro correspondiente
  }
};

export default Stats;
