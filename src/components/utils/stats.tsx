"use client";

import React from "react";
import { Icon } from "@iconify/react";

import BoxStat from "./box-stats";

function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <BoxStat
        cantidad={100}
        icon={<Icon icon="mdi:travel" />}
        title="Viajes"
      />
      <BoxStat
        cantidad={500}
        icon={<Icon icon="ic:twotone-point-of-sale" />}
        title="Ventas"
      />
      <BoxStat
        cantidad={200}
        icon={<Icon icon="mdi:alpha-r-box" />}
        title="Reservas"
      />
      <BoxStat
        cantidad={300}
        icon={<Icon icon="f7:person-2-fill" />}
        title="Clientes"
      />
      <BoxStat
        cantidad={150}
        icon={<Icon icon="vaadin:office" />}
        title="Terminales"
      />
      <BoxStat
        cantidad={250}
        icon={<Icon icon="mdi:account-tie" />}
        title="Empleados"
      />
    </div>
  );
}

export default Stats;
