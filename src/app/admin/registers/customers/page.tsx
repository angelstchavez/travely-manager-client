import CustomerForm from "@/components/customers/customer-form";
import CustomerReport from "@/components/customers/customer-report";
import TableCustomer from "@/components/customers/customer-table";
import React from "react";

function CustomerPage() {
  return (
    <div>
      <CustomerForm></CustomerForm>
      <TableCustomer></TableCustomer>
      <CustomerReport></CustomerReport>
    </div>
  );
}

export default CustomerPage;
