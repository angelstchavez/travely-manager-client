import React from "react";
import ModelReport from "../models/model-report";
import ModelTable from "../models/model-table";
import ModelForm from "../models/model-form";

function ModelTab() {
  return (
    <div>
      <ModelForm></ModelForm>
      <ModelTable></ModelTable>
      <ModelReport></ModelReport>
    </div>
  );
}

export default ModelTab;
