import { Button } from "@swc-react/button";
import { DialogWrapper } from "@swc-react/dialog";
import ConfigurableForm from "./ConfigurableForm";
import React, { useContext, useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";

import classes from "../styles/StepperForm.module.css";
import { ScholarshipFormContext } from "../context/ScholarshipFormContext";
import {
  ScholarshipData,
  ScholarshipDataRequest,
  ScholarshipFormKeys,
  getScholarshipFormData,
  scholarshipApplicationStatusesMap,
  submitApplication,
  updateStatusAndFormDetails,
  validateForm,
} from "../services/ScholarshipFormService";
import { HelpText } from "@swc-react/help-text";
import { RoleType, ScholarshipApplicationResponse } from "../utils/types";
import { getUsersInfo } from "../utils/shared";
import ReviewProcess from "./ReviewProcess";
import { useNavigate } from "react-router-dom";

const renderErrors = (errors: string[], onClose: (arg0: never[]) => void) => {
  console.log("In renderErrors", errors);
  return (
    <DialogWrapper
      slot="click-content"
      headline="Please fix the following issues:"
      dismissable
      underlay
      close={() => onClose([])}
      open={true}
    >
      {errors.map((error: string) => (
        // <p key={error.key}>{error}</p>
        <HelpText variant="negative" icon>
          {error}
        </HelpText>
      ))}
    </DialogWrapper>
  );
};

const StepperForm: React.FC<any> = (props: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const { configs, mode, scholarshipID } = props;
  const formDataCtx = useContext(ScholarshipFormContext);
  const userInfo = getUsersInfo().decoded;
  const isUser = userInfo?.role == RoleType.USER;
  const isAdmin = userInfo?.role == RoleType.ADMIN;
  const isPM = userInfo?.role == RoleType.PROGRAM_MANAGER;
  const isReviewer = userInfo?.role == RoleType.REVIEWER;
  const stepperLength = isUser ? configs.length : configs.length + 1;
  const disableSubmit = isUser && mode === "preview";
  const enableStep = (isAdmin || isPM || isReviewer) && mode === "preview";
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    let response: ScholarshipApplicationResponse | undefined;
    if (!mode) {
      const errors = validateForm(formDataCtx);
      if (errors.length > 0) {
        setErrors(errors);
        return;
      }
      console.log("In Submit", formDataCtx);
      response = (await submitApplication(formDataCtx))?.data ?? undefined;
    } else if (mode === "preview" && enableStep) {
      console.log("In Preview", formDataCtx);
      response =
        (await updateStatusAndFormDetails(userInfo, { ...formDataCtx }))
          ?.data ?? undefined;
    }
    if (response?.scholarshipID) {
      const url = `/scholarship-form/preview/${response.scholarshipID}`;
      navigate("/");
      setTimeout(() => {
        navigate(url);
      });
    } else {
      alert("Something went wrong. Please try again later.");
    }
  };
  console.log("In StepperForm.tsx");

  const fetchScholarshipApplications = async () => {
    let scholarshipData: ScholarshipData[] = [];
    const request: ScholarshipDataRequest = {
      field: "scholarshipID",
      keyword: scholarshipID!,
    };
    scholarshipData = (await getScholarshipFormData(request)) ?? [];
    if (scholarshipData.length > 0) {
      Object.keys(scholarshipData[0]).forEach((key) => {
        formDataCtx.onFormDataChange(
          key as ScholarshipFormKeys,
          scholarshipData[0][key as ScholarshipFormKeys] ?? ""
        );
      });
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (mode === "preview" && scholarshipID) {
      fetchScholarshipApplications();
    }
  }, [mode, scholarshipID]);

  return (
    <>
      <div>
        {scholarshipID && scholarshipID.length > 0 ? (
          <h3 className={classes["scholarship-id"]}>
            Application ID: {scholarshipID}
          </h3>
        ) : (
          <></>
        )}
        {formDataCtx.status && formDataCtx.status.length > 0 ? (
          <h3 className={classes["scholarship-id"]}>
            Status: {scholarshipApplicationStatusesMap.get(formDataCtx.status)}
          </h3>
        ) : (
          <></>
        )}
        <Stepper activeStep={activeStep}>
          {configs.map((config: any) => (
            <Step key={config.key} label={config.label} />
          ))}
          {enableStep && (
            <Step key={"reviewProcess"} label={"Review Process"} />
          )}
        </Stepper>
        {activeStep < configs.length && (
          <ConfigurableForm
            key={configs[activeStep].key}
            config={configs[activeStep].formFields}
          />
        )}
        {enableStep && activeStep == stepperLength - 1 && <ReviewProcess />}
        <div className={classes.stepperButtons}>
          <Button
            disabled={!(stepperLength > 0 && activeStep !== 0)}
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Previous
          </Button>
          {activeStep !== stepperLength - 1 && (
            <Button onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
          )}
          {activeStep === stepperLength - 1 && (
            <Button onClick={onSubmitHandler} disabled={disableSubmit}>
              Submit
            </Button>
          )}
        </div>
      </div>
      <div>{errors.length > 0 ? renderErrors(errors, setErrors) : <></>}</div>
    </>
  );
};

export default StepperForm;
