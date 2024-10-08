"use client";

import React, { useState } from "react";
import { useTabs } from "@/hooks/use-tabs";
import { Framer } from "@/lib/framer";
import TripPassengers from "./trip-passengers";
import SaleRegister from "@/components/sale/sale-register";
import TripReservation from "./trip-reservation";

interface SaleTabProps {
  tripId: number;
  onCancel: () => void;
}

function SaleTab({ tripId, onCancel }: SaleTabProps) {
  const [hookProps] = useState({
    tabs: [
      {
        label: "Registrar",
        children: <SaleRegister tripId={tripId} onCancel={onCancel} />,
        id: "register",
      },
      {
        label: "Pasajeros",
        children: <TripPassengers />,
        id: "passagers",
      },
      {
        label: "Reservas",
        children: <TripReservation />,
        id: "reserves",
      },
    ],
    initialTabId: "Matches",
  });
  const framer = useTabs(hookProps);

  return (
    <>
      <div className="mt-2 items-start flex bg-white px-2 border rounded-md">
        <Framer.Tabs {...framer.tabProps} />
      </div>
      <div className="py-2 overflow-auto">{framer.selectedTab.children}</div>
    </>
  );
}

export default SaleTab;
