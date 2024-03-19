import React from "react";
import VehicleReport from "./vehicle-report";
import VehicleTable from "./vehicle-table";
import VehicleForm from "./vehicle-form";

const VehicleTab: React.FC = () => {
  return (
    <div>
      <VehicleForm></VehicleForm>
      <VehicleTable></VehicleTable>
      <VehicleReport></VehicleReport>
    </div>
  );
};

export default VehicleTab;
