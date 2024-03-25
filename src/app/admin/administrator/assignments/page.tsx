import AllocationForm from "@/components/allocations/allocation-form";
import AllocationReport from "@/components/allocations/allocation-report";
import AllocationTable from "@/components/allocations/allocation-table";
import React from "react";

function AssignmentsPage() {
  return (
    <>
      <AllocationForm></AllocationForm>
      <AllocationTable></AllocationTable>
      <AllocationReport></AllocationReport>
    </>
  );
}

export default AssignmentsPage;
