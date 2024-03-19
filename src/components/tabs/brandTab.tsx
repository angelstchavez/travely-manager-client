import React from "react";
import BrandReport from "../brands/brand-report";
import BrandForm from "../brands/brand-form";
import BrandTable from "../brands/brand-table";

function BrandTab() {
  return (
    <div>
      <BrandForm></BrandForm>
      <BrandTable></BrandTable>
      <BrandReport></BrandReport>
    </div>
  );
}

export default BrandTab;
