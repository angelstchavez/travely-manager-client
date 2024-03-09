"use client";

import React, { useState } from "react";

import { useTabs } from "@/hooks/use-tabs";
import { Framer } from "@/lib/framer";

import VeicleTab from "./vehicles-section/vehicleTab";
import ModelTab from "./vehicles-section/modelTab";
import BrandTab from "./vehicles-section/brandTab";

const Tabs = () => {
  const [hookProps] = useState({
    tabs: [
      {
        label: "Vehiculos",
        children: <VeicleTab />,
        id: "vehicles",
      },
      {
        label: "Modelos",
        children: <ModelTab />,
        id: "models",
      },
      {
        label: "Marcas",
        children: <BrandTab />,
        id: "brands",
      },
    ],
    initialTabId: "Matches",
  });
  const framer = useTabs(hookProps);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full items-start flex bg-white px-8 pt-16">
        <Framer.Tabs {...framer.tabProps} />
      </div>

      <div className="pt-10">{framer.selectedTab.children}</div>
    </div>
  );
};

export default Tabs;
