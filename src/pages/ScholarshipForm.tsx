import React from "react";
import configs from "../services/ScholarshipFormService";
import StepperForm from "../components/StepperForm";

const ScholarshipForm: React.FC = () => {
  const sfConfigs = configs;
  return <StepperForm configs={sfConfigs} />;
};

export default ScholarshipForm;
