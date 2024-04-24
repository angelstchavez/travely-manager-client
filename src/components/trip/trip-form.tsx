"use client";

import React from "react";
import CustomTitleIcon from "../utils/icons/custom-title-icon";

function TripForm() {
  return (
    <>
      <section className="border rounded p-4 my-4 bg-white">
        <CustomTitleIcon
          icon="emojione-monotone:minibus"
          text="Registrar viaje"
        />
      </section>
    </>
  );
}

export default TripForm;
