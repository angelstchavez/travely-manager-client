import React from "react";
import EmployeeTable from "../employee/employee-table";
import EmployeeReport from "../employee/employee-report";
import EmployeeForm from "../employee/employee-form";

function EmployeeTab() {
  return (
    <div>
      <EmployeeForm></EmployeeForm>
      <EmployeeTable></EmployeeTable>
      <EmployeeReport></EmployeeReport>
    </div>
  );
}

export default EmployeeTab;
