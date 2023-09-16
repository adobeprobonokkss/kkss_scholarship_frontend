// Form for tracking volunteering hours
// The form will have the following fields
// Activity Date - input date
// No. of hours - <Textfield> from @swc-react/textfield
// Activity Description - <Textfield> from @swc-react/textfield
// Submit button - <Button> from @swc-react/button
// Each input field has a field label - <FieldLabel> from @swc-react/field-label

import React, { useState } from "react";
import { Button } from "@swc-react/button";
import { Textfield } from "@swc-react/textfield";
import { FieldLabel } from "@swc-react/field-label";
import { HelpText } from "@swc-react/help-text";

import classes from "../styles/TrackVolunteeringHours.module.css";
import { DialogWrapper } from "@swc-react/dialog";
import { Icon } from "@swc-react/icon";
import { submitVolunteeringHours } from "../services/ScholarshipFormService";
import { VolunteeringDetails } from "../utils/types";
import { useNavigate } from "react-router-dom";

const renderErrors = (errors: string[], onClose: (arg0: never[]) => void) => {
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

const renderHelpTexts = (helpTexts: string[]) => {
  return helpTexts.map((helpText: string) => (
    <HelpText key={helpText.split(" ").join("_")} variant="neutral" icon>
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
      {helpText}
    </HelpText>
  ));
};

export const TrackVolunteeringHours: React.FC = () => {
  const [activityDate, setActivityDate] = useState("");
  const [noOfHours, setNoOfHours] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const helpTexts = [
    "Minimum 1 hour",
    "Increment must also be in no. hours. E.g. 1, 2, 3, etc.",
    "1.5, 1.25, 2.5, 3.75, etc. are not allowed",
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(activityDate, noOfHours, activityDescription);
    const errors = validateForm();
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    const request: VolunteeringDetails = {
      activityDate: activityDate,
      noOfHours: noOfHours,
      activityDescription: activityDescription,
      scholarshipID: "",
      email: "",
      name: "",
      submissionDate: "",
    };

    await submitVolunteeringHours(request);
    navigate("/");
    navigate("/track-time");
  };

  const validateForm = () => {
    let errors: string[] = [];
    if (activityDate === "") {
      errors.push("Activity Date is required");
    }
    if (noOfHours === "") {
      errors.push("No. of hours is required");
    }
    if (activityDescription === "") {
      errors.push("Activity Description is required");
    }

    if (+noOfHours != Math.floor(+noOfHours)) {
      errors.push("No. of hours must be a integer >= 1");
    }

    if (+noOfHours < 1) {
      errors.push("No. of hours must be a integer >= 1");
    }
    return errors;
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h1 className={classes.title}>Track Volunteering Hours</h1>
      <div className={classes.instructions}>{renderHelpTexts(helpTexts)}</div>
      <div className={classes.date}>
        <FieldLabel
          key={"activity-date"}
          style={{
            fontSize: "12pt",
            fontFamily: `'docs-Roboto', Helvetica, Arial, sans-serif`,
            letterSpacing: 0,
            color: "#000000",
            fontWeight: 510,
          }}
          required
        >
          Activity Date
        </FieldLabel>
        <input
          key={"activity-date-input"}
          id="activity-date"
          type="date"
          className={classes.datePicker}
          value={activityDate}
          onChange={(event: {
            target: { value: React.SetStateAction<string> };
          }) => setActivityDate(event.target.value)}
          required
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className={classes.hours}>
        <FieldLabel
          key={"no-of-hours"}
          style={{
            fontSize: "12pt",
            fontFamily: `'docs-Roboto', Helvetica, Arial, sans-serif`,
            letterSpacing: 0,
            color: "#000000",
            fontWeight: 510,
          }}
          required
        >
          No. of hours
        </FieldLabel>
        <Textfield
          key={"no-of-hours-input"}
          id="no-of-hours"
          type="text"
          value={noOfHours}
          change={(event: any) => setNoOfHours(event.target.value)}
          required
          style={{ width: "100%" }}
          placeholder="Enter no. of hours"
          quiet
        />
      </div>
      <div className={classes.description}>
        <FieldLabel
          key={"activity-description"}
          style={{
            fontSize: "12pt",
            fontFamily: `'docs-Roboto', Helvetica, Arial, sans-serif`,
            letterSpacing: 0,
            color: "#000000",
            fontWeight: 510,
          }}
          required
        >
          Activity Description
        </FieldLabel>
        <Textfield
          key={"activity-description-input"}
          style={{ width: "100%" }}
          id="activity-description"
          value={activityDescription}
          change={(event: any) => setActivityDescription(event.target.value)}
          required
          quiet
          placeholder="Enter activity description"
        />
      </div>
      <Button type="submit">Submit</Button>
      <div>{errors.length > 0 ? renderErrors(errors, setErrors) : <></>}</div>
    </form>
  );
};
