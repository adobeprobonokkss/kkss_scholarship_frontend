import { Button } from "@swc-react/button";
import ConfigurableForm from "./ConfigurableForm";
import React, { useContext, useState } from "react";
import { Stepper, Step } from "react-form-stepper";

import classes from "../styles/StepperForm.module.css";
import { ScholarshipFormContext } from "../context/ScholarshipFormContext";
import {
  submitApplication,
  validateForm,
} from "../services/ScholarshipFormService";

const StepperForm: React.FC<any> = (props: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const { configs } = props;
  const formDataCtx = useContext(ScholarshipFormContext);
  const onSubmitHandler = () => {
    const errors = validateForm(formDataCtx);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }
    console.log("In Submit", formDataCtx);
    submitApplication(formDataCtx);
  };
  console.log("In StepperForm.tsx");

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {configs.map((config: any) => (
          <Step key={config.key} label={config.label} />
        ))}
      </Stepper>
      <ConfigurableForm
        key={configs[activeStep].key}
        config={configs[activeStep].formFields}
      />
      <div className={classes.stepperButtons}>
        <Button
          disabled={!(configs.length > 0 && activeStep !== 0)}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Previous
        </Button>
        {activeStep !== configs.length - 1 && (
          <Button onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
        )}
        {activeStep === configs.length - 1 && (
          <Button onClick={onSubmitHandler}>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default StepperForm;
