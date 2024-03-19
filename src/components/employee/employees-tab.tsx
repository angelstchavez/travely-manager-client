"use client";

import React, { useState } from "react";

import { useTabs } from "@/hooks/use-tabs";
import { Framer } from "@/lib/framer";

import EmployeeTab from "./EmployeeTab";
import DriverTab from "./DriverTab";
import SellerTab from "./SellerTab";

const EmployeeTabs = () => {
  const [hookProps] = useState({
    tabs: [
      {
        label: "General",
        children: <EmployeeTab />,
        id: "employees",
      },
      {
        label: "Conductores",
        children: <DriverTab />,
        id: "drivers",
      },
      {
        label: "Vendedores",
        children: <SellerTab />,
        id: "sellers",
      },
    ],
    initialTabId: "Matches",
  });
  const framer = useTabs(hookProps);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full items-start flex bg-white px-2 border rounded">
        <Framer.Tabs {...framer.tabProps} />
      </div>

      <div>{framer.selectedTab.children}</div>
    </div>
  );
};

export default EmployeeTabs;
