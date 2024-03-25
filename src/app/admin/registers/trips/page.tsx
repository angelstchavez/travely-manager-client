import React from "react";
import TripForm from "@/components/trip/trip-form";
import TripReport from "@/components/trip/trip-report";
import TripTable from "@/components/trip/trip-table";

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
