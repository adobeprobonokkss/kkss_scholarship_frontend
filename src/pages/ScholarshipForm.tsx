import React from "react";
import configs from "../services/ScholarshipFormService";
import StepperForm from "../components/StepperForm";
import { ScholarshipFormProvider } from "../context/ScholarshipFormContext";
import { useParams } from "react-router-dom";

import classes from "../styles/ScholarshipForm.module.css";

const ScholarshipForm: React.FC = () => {
  const sfConfigs = configs;
  const { mode, scholarshipID } = useParams();
  if (mode === "preview") {
    sfConfigs.forEach((config: any) => {
      config.formFields.forEach((field: any) => {
        field.props.disabled = true;
      });
    });
  }

  console.log("In ScholarshipForm.tsx");
  return (
    <ScholarshipFormProvider>
      <StepperForm
        configs={sfConfigs}
        mode={mode}
        scholarshipID={scholarshipID}
      />
    </ScholarshipFormProvider>
  );
};

export default ScholarshipForm;
