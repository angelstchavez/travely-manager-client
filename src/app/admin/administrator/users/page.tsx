import UserForm from "@/components/user/user-form";
import UserTable from "@/components/user/user-table";
import UserReport from "@/components/user/user-report";
import React from "react";

function UserPage() {
  return (
    <>
      <UserForm></UserForm>
      <UserTable></UserTable>
      <UserReport></UserReport>
    </>
  );
}

export default UserPage;
