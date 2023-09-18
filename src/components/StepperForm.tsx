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
  validateReviewProcess,
} from "../services/ScholarshipFormService";
import { HelpText } from "@swc-react/help-text";
import { RoleType, ScholarshipApplicationResponse } from "../utils/types";
import { getUsersInfo } from "../utils/shared";
import ReviewProcess from "./ReviewProcess";
import { useNavigate } from "react-router-dom";
import { Icon } from "@swc-react/icon";

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
        <HelpText size="l" variant="negative" icon>
          {error}
        </HelpText>
      ))}
    </DialogWrapper>
  );
};

const renderConfirmationDialog = (
  submitApplication: () => Promise<void>,
  onClose: () => void
) => {
  return (
    <DialogWrapper
      slot="click-content"
      headline="Are you sure you want to submit the application?"
      dismissable
      underlay
      open={true}
      close={onClose}
    >
      <HelpText size="l" variant="neutral" icon>
        <Icon
          style={{
            position: "relative",
            width: "18px",
            height: "18px",
            margin: "0px 6px 0 0",
            top: "4px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            viewBox="0 0 18 18"
            width="18"
          >
            <title>InfoMedium</title>
            <rect
              id="ToDelete"
              fill="#ff13dc"
              opacity="0"
              width="18"
              height="18"
            />
            <path d="M9,1a8,8,0,1,0,8,8A8,8,0,0,0,9,1ZM8.85,3.15a1.359,1.359,0,0,1,1.43109,1.28286q.00352.06452.00091.12914A1.332,1.332,0,0,1,8.85,5.994,1.353,1.353,0,0,1,7.418,4.561,1.359,1.359,0,0,1,8.72191,3.14905Q8.78595,3.14652,8.85,3.15ZM11,13.5a.5.5,0,0,1-.5.5h-3a.5.5,0,0,1-.5-.5v-1a.5.5,0,0,1,.5-.5H8V9H7.5A.5.5,0,0,1,7,8.5v-1A.5.5,0,0,1,7.5,7h2a.5.5,0,0,1,.5.5V12h.5a.5.5,0,0,1,.5.5Z" />
          </svg>
        </Icon>
        Please make sure all required fields are filled and the details are
        correct.
      </HelpText>
      <HelpText size="l" variant="negative" icon>
        Once submitted, you will not be able to edit the application and it move
        to the next stage of the review process.
      </HelpText>
      <div className={classes["dialog-buttons"]}>
        <Button
          onClick={() => {
            submitApplication();
            onClose();
          }}
        >
          Submit
        </Button>
        <Button variant="negative" onClick={onClose}>
          Close
        </Button>
      </div>
    </DialogWrapper>
  );
};

const StepperForm: React.FC<any> = (props: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { configs, mode, scholarshipID } = props;
  const formDataCtx = useContext(ScholarshipFormContext);
  const userInfo = getUsersInfo().decoded;
  const isUser = userInfo?.role == RoleType.USER;
  const isAdmin = userInfo?.role == RoleType.ADMIN;
  const isPM = userInfo?.role == RoleType.PROGRAM_MANAGER;
  const isReviewer = userInfo?.role == RoleType.REVIEWER;
  const stepperLength = isUser ? configs.length : configs.length + 1;
  const disableSubmit = () => {
    if (isUser && mode === "preview") {
      return true;
    } else if (isReviewer && formDataCtx.status !== "inital_review_completed") {
      return true;
    } else if (
      isPM &&
      ![
        "submitted",
        "inital_review_completed",
        "background_verification_completed",
      ].includes(formDataCtx.status as string)
    ) {
      return true;
    }
    return false;
  };
  const enableStep = (isAdmin || isPM || isReviewer) && mode === "preview";
  const navigate = useNavigate();

  const onSubmitHandler = () => {
    setSubmitting(true);
  };

  const submitForm = async () => {
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
      const errors = validateReviewProcess(formDataCtx);
      if (errors.length > 0) {
        setErrors(errors);
        return;
      }
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
          (scholarshipData[0][key as ScholarshipFormKeys] ?? "")?.trim()
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
            <Button onClick={onSubmitHandler} disabled={disableSubmit()}>
              Submit
            </Button>
          )}
        </div>
      </div>
      <div>{errors.length > 0 ? renderErrors(errors, setErrors) : <></>}</div>
      {submitting &&
        renderConfirmationDialog(submitForm, () => setSubmitting(false))}
    </>
  );
};

export default StepperForm;
