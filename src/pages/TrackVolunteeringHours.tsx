import React, { FC, lazy, useEffect, useState } from "react";
const { Button } = await import("@swc-react/button");
const { Textfield } = await import("@swc-react/textfield");
const { FieldLabel } = await import("@swc-react/field-label");
const { HelpText } = await import("@swc-react/help-text");
const { DialogWrapper } = await import("@swc-react/dialog");
const { Icon } = await import("@swc-react/icon");
const { Table, TableBody, TableCell, TableHead, TableRow } = await import(
  "@swc-react/table"
);
const { useNavigate } = await import("react-router-dom");

import classes from "../styles/TrackVolunteeringHours.module.css";
import {
  ScholarshipDataRequest,
  getScholarshipFormData,
} from "../services/ScholarshipFormService";
import {
  ApplicationStatusKeys,
  PastVolunteeringDetails,
  RoleType,
  VolunteeringDetails,
} from "../utils/types";
import { getUsersInfo } from "../utils/shared";
import {
  getAllVolunteeringActivityHoursByUser,
  getVolunteeringHours,
  submitVolunteeringHours,
} from "../services/VolunteerService";
import ClockIcon from "../components/ClockIcon";
const HelpTextIcon = lazy(() => import("../components/HelpTextIcon"));

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
        <HelpTextIcon />
      </Icon>
      {helpText}
    </HelpText>
  ));
};

const TrackVolunteeringHours: FC = () => {
  const [activityDate, setActivityDate] = useState("");
  const [noOfHours, setNoOfHours] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [scholarshipApplication, setScholarshipApplication] =
    useState<any>(undefined);
  const [hoursVolunteered, setHoursVolunteered] = useState<string>("0");
  const [pastSubmissions, setPastSubmissions] = useState<
    PastVolunteeringDetails[]
  >([]);
  const navigate = useNavigate();
  const helpTexts = [
    "Minimum 1 hour",
    "Increment must also be in no. hours. E.g. 1, 2, 3, etc.",
    "1.5, 1.25, 2.5, 3.75, etc. are not allowed",
  ];
  const userInfo = getUsersInfo().decoded;

  const checkElegibility = async () => {
    if (userInfo === null) {
      return navigate("/");
    }
    if (userInfo.role !== RoleType.USER) {
      return navigate("/");
    }
    const request: ScholarshipDataRequest = {
      year: new Date().getFullYear().toString(),
      status: ApplicationStatusKeys.approved,
      field: "email",
      keyword: userInfo.email?.trim(),
    };

    const scholarshipApplications =
      (await getScholarshipFormData(request)) ?? [];
    if (scholarshipApplications.length == 0) {
      navigate("/");
    }
    const eligibileEducationLevels = [
      "puCollege",
      "diploma",
      "graduation",
      "postGraduation",
      "others",
    ];
    if (
      !eligibileEducationLevels.includes(
        scholarshipApplications.at(0)?.education
      )
    ) {
      alert("Applicant should be in 11th standard or above to volunteer");
      navigate("/");
    }
    console.log(scholarshipApplications);
    setScholarshipApplication(scholarshipApplications.at(0));
  };

  useEffect(() => {
    checkElegibility();
  }, []);

  useEffect(() => {
    console.log(scholarshipApplication);
    if (
      !scholarshipApplication ||
      !scholarshipApplication.scholarshipID ||
      !userInfo?.email
    )
      return;

    getVolunteeringHours(
      scholarshipApplication.scholarshipID,
      userInfo?.email
    ).then((response) => {
      if (!response) return;
      if (!response.data) return;
      if (response.data.volunteeringHoursList.length === 0) return;
      console.log(response.data.volunteeringHoursList.at(0).approvedHours);
      setHoursVolunteered(
        response.data.volunteeringHoursList.at(0).approvedHours
      );
    });

    getAllVolunteeringActivityHoursByUser(
      scholarshipApplication.scholarshipID,
      userInfo?.email
    ).then((response) => {
      if (!response) return;
      if (!response.data) return;
      if (response.data.activityHoursList.length === 0) return;
      setPastSubmissions(response.data.activityHoursList);
    });
  }, [scholarshipApplication]);

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
      scholarshipID: scholarshipApplication.scholarshipID,
    };

    await submitVolunteeringHours(request);
    window.location.reload();
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
    const hoursPatter = new RegExp("[1-9]{1,}");
    const descriptionPattern = new RegExp("[a-zA-Z., ]{1,1000}");
    if (!hoursPatter.test(noOfHours)) {
      errors.push("No. of hours must be a valid number");
    }
    if (!descriptionPattern.test(activityDescription)) {
      errors.push("Activity Description must be valid");
    }

    return errors;
  };

  return (
    <>
      <div className={classes["main-container"]}>
        <div className={classes["track-time-container"]}>
          <div className={classes["impact"]}>
            <h1 className={classes.title}>
              My Impact in {new Date().getFullYear()}
            </h1>
            <div className={classes["impact-label"]}>
              <Icon
                style={{
                  marginTop: "0.4rem",
                }}
                size="xxl"
              >
                <ClockIcon />
              </Icon>
              <div className={classes["hours-volunteered-div"]}>
                <span className={classes["hours-volunteered"]}>
                  {hoursVolunteered}
                </span>{" "}
                hours volunteered
              </div>
            </div>
            <h3>Scholarship ID: {scholarshipApplication?.scholarshipID}</h3>
          </div>
          <div className={classes["track-volunteering-hours-form"]}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <h1 className={classes.title}>Track Time</h1>
              <div className={classes.instructions}>
                {renderHelpTexts(helpTexts)}
              </div>
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
                  pattern="[1-9]{1,}"
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
                  change={(event: any) =>
                    setActivityDescription(event.target.value)
                  }
                  required
                  placeholder="Enter activity description"
                  multiline={true}
                  pattern={"[a-zA-Z., ]{1,1000}"}
                />
              </div>
              <Button type="submit">Submit</Button>
              <div>
                {errors.length > 0 ? renderErrors(errors, setErrors) : <></>}
              </div>
            </form>
          </div>
        </div>
        {pastSubmissions.length > 0 && (
          <div className={classes["submittted-enteries"]}>
            <h1>Past Activities</h1>
            <div className={classes["past-activities"]}>
              <Table
                id="sorted-virtualized-table"
                style={{ height: "65vh" }}
                scroller={true}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={`${classes["table-cell"]} ${classes["activity-date"]}`}
                    >
                      Activity Date
                    </TableCell>
                    <TableCell
                      className={`${classes["table-cell"]} ${classes["no-of-hours"]}`}
                    >
                      Hours
                    </TableCell>
                    <TableCell
                      className={`${classes["table-cell"]} ${classes["description"]}`}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      className={`${classes["table-cell"]} ${classes["submission-date"]}`}
                    >
                      Submission Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pastSubmissions.map((submission) => (
                    <TableRow key={submission.activityDate}>
                      <TableCell
                        className={`${classes["table-cell"]}  ${classes["activity-date"]}`}
                      >
                        {submission.activityDate}
                      </TableCell>
                      <TableCell
                        className={`${classes["table-cell"]}  ${classes["no-of-hours"]}`}
                      >
                        {submission.noOfHours}
                      </TableCell>
                      <TableCell
                        className={`${classes["table-cell"]}  ${classes["description"]}`}
                      >
                        {submission.activityDescription}
                      </TableCell>
                      <TableCell
                        className={`${classes["table-cell"]}  ${classes["submission-date"]}`}
                      >
                        {submission.submissionDate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TrackVolunteeringHours;
