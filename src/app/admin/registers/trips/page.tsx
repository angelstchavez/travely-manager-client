"use client"

import TripForm from "@/components/trip/trip-form";
import TripReport from "@/components/trip/trip-report";
import TripTable from "@/components/trip/trip-table";
import React from "react";

function TripPage() {
  return (
    <>
      <TripForm></TripForm>
      <TripTable></TripTable>
      <TripReport></TripReport>
    </>
  );
}

export default TripPage;
