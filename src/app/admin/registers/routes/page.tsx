"use client";

import RouteForm from "@/components/routes/route-form";
import RouteReport from "@/components/routes/route-report";
import TableRoute from "@/components/routes/route-table";
import React from "react";

const RoutePage = () => {
  return (
    <div>
      <RouteForm />
      <TableRoute />
      <RouteReport />
    </div>
  );
};

export default RoutePage;
