import { Button } from "@swc-react/button";
import ConfigurableForm from "./ConfigurableForm";
import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";

import classes from "../styles/StepperForm.module.css";

const StepperForm: React.FC<any> = (props: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const { configs, onSubmit } = props;

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
        {configs.length > 0 && activeStep !== 0 && (
          <Button onClick={() => setActiveStep(activeStep - 1)}>
            Previous
          </Button>
        )}
        {activeStep !== configs.length - 1 && (
          <Button onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
        )}
        {activeStep === configs.length - 1 && (
          <Button onClick={() => onSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default StepperForm;
