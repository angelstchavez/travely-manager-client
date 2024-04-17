"use client"

import UserForm from "@/components/user/user-form";
import UserTablee from "@/components/user/UserTable";
import UserTable from "@/components/user/user-table";
import UserReport from "@/components/user/user-report";
import React from "react";

function UserPage() {
  return (
    <>
      <UserForm></UserForm>
      <UserTable></UserTable>
      <UserTablee/>
      <UserReport></UserReport>
    </>
  );
}

export default UserPage;
