import React, { lazy } from "react";
const { useParams } = await import("react-router-dom");
import configs from "../services/ScholarshipFormService";
const StepperForm = lazy(() => import("../components/StepperForm"));
import { ScholarshipFormProvider } from "../context/ScholarshipFormContext";

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
