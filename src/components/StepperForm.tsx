const { Icon } = await import("@swc-react/icon");
const { HelpText } = await import("@swc-react/help-text");
const { Button } = await import("@swc-react/button");
const { DialogWrapper } = await import("@swc-react/dialog");
const { Stepper, Step } = await import("react-form-stepper");
const { useNavigate } = await import("react-router-dom");
import React, { lazy, useContext, useEffect, useState } from "react";

import classes from "../styles/StepperForm.module.css";
import { ScholarshipFormContext } from "../context/ScholarshipFormContext";
import {
  ScholarshipData,
  ScholarshipDataRequest,
  ScholarshipFormKeys,
  getScholarshipFormData,
  submitApplication,
  updateStatusAndFormDetails,
  validateForm,
  validateReviewProcess,
} from "../services/ScholarshipFormService";
import {
  ApplicationStatus,
  ApplicationStatusKeys,
  RoleType,
  ScholarshipApplicationResponse,
} from "../utils/types";
import { getUsersInfo } from "../utils/shared";
import ConfigurableForm from "./ConfigurableForm";
const ReviewProcess = lazy(() => import("./ReviewProcess"));
const HelpTextIcon = lazy(() => import("./HelpTextIcon"));

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
          <HelpTextIcon />
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
    } else if (
      isReviewer &&
      formDataCtx.status != ApplicationStatusKeys.initial_review_completed
    ) {
      return true;
    } else if (
      isPM &&
      formDataCtx.status &&
      ![
        "submitted",
        "inital_review_completed",
        "background_verification_completed",
      ].includes(formDataCtx.status)
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
      setTimeout(() => {
        navigate(url);
      }, 100);
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

    if (mode !== "preview" && userInfo?.role != RoleType.USER) {
      navigate("/");
    }

    if (
      !mode &&
      userInfo?.role == RoleType.USER &&
      (userInfo?.email ?? "").length > 0
    ) {
      formDataCtx.onFormDataChange("email", userInfo?.email ?? "");
      configs[0].formFields[0].props.disabled = true;
    }
  }, [mode, scholarshipID]);

  useEffect(() => {
    const buttons = document.querySelectorAll("#RFS-StepMain button");
    const personalDetailsButton = buttons[0];
    const academicDetailsButton = buttons[1];
    const familyDetailsButton = buttons[2];
    const reviewProcessButton = buttons[3];
    console.log(
      "In useEffect",
      personalDetailsButton,
      academicDetailsButton,
      familyDetailsButton,
      reviewProcessButton
    );
    scrollTo(0, 0);

    personalDetailsButton?.removeAttribute("disabled");
    academicDetailsButton?.removeAttribute("disabled");
    familyDetailsButton?.removeAttribute("disabled");
    reviewProcessButton?.removeAttribute("disabled");

    if (personalDetailsButton) {
      personalDetailsButton.addEventListener("click", () => {
        console.log("In personalDetailsButton");
        setActiveStep(0);
      });
    }
    if (academicDetailsButton) {
      academicDetailsButton.addEventListener("click", () => {
        console.log("In academicDetailsButton");
        setActiveStep(1);
      });
    }
    if (familyDetailsButton) {
      familyDetailsButton.addEventListener("click", () => {
        console.log("In familyDetailsButton");
        setActiveStep(2);
      });
    }
    if (reviewProcessButton) {
      reviewProcessButton.addEventListener("click", () => {
        console.log("In reviewProcessButton");
        setActiveStep(3);
      });
    }
  }, [activeStep]);

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
            Status: {ApplicationStatus[formDataCtx.status]}
          </h3>
        ) : (
          <></>
        )}
        <Stepper activeStep={activeStep}>
          {configs.map((config: any) => (
            <Step
              onClick={() => {
                console.log("In Step", config.key);
              }}
              key={config.key}
              label={config.label}
            />
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
