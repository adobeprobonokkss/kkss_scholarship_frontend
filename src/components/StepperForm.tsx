import { Button } from "@swc-react/button";
import ConfigurableForm from "./ConfigurableForm";
import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";

const StepperForm: React.FC<any> = (props: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const { configs } = props;

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {configs.map((config: any) => (
          <Step label={config.label} />
        ))}
      </Stepper>
      <div style={{ padding: "20px" }}>
        <ConfigurableForm config={configs[activeStep].formFields} />
        {configs.length > 0 && activeStep !== 0 && (
          <Button onClick={() => setActiveStep(activeStep - 1)}>
            Previous
          </Button>
        )}
        {activeStep !== configs.length - 1 && (
          <Button onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
        )}
      </div>
    </div>
  );
};

export default StepperForm;
