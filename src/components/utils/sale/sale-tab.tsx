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
    <div className="fixed inset-0 z-50 bg-zinc-600 bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="flex flex-col bg-white rounded- p-2 rounded-xl">
        <div className="items-start flex bg-white px-2 border rounded-md">
          <Framer.Tabs {...framer.tabProps} />
        </div>
        <div className="py-2 overflow-auto">{framer.selectedTab.children}</div>
      </div>
    </div>
  );
}

export default SaleTab;
