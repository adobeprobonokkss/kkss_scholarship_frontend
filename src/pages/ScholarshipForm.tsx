import React from "react";
import configs from "../services/ScholarshipFormService";
import StepperForm from "../components/StepperForm";
import { ScholarshipFormProvider } from "../context/ScholarshipFormContext";

const ScholarshipForm: React.FC = () => {
  const sfConfigs = configs;
  console.log("In ScholarshipForm.tsx");
  return (
    <ScholarshipFormProvider>
      <StepperForm configs={sfConfigs} />
    </ScholarshipFormProvider>
  );
};

export default ScholarshipForm;
