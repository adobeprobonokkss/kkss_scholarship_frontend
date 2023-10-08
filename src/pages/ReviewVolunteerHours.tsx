const { Table, TableBody, TableCell, TableHead, TableRow } = await import(
  "@swc-react/table"
);
const { Button } = await import("@swc-react/button");
import React, { FC, useEffect, useState } from "react";
import {
  approveOrRejectVolunteeringHours,
  getAllVolunteerActivityHours,
} from "../services/VolunteerService";
import { PastVolunteeringDetails } from "../utils/types";
import classes from "../styles/ReviewVolunteerHours.module.css";
import { getUsersInfo } from "../utils/shared";

const ReviewVolunteerHours: FC = () => {
  const [volunteerActivityHoursList, setVolunteerActivityHoursList] = useState<
    PastVolunteeringDetails[]
  >([]);
  const userInfo = getUsersInfo().decoded;

  const decisionHandler = async (
    requestID: string,
    scholarshipID: string,
    decision: string,
    email: string
  ) => {
    if (!email) return;
    if (!requestID) return;
    if (!scholarshipID) return;
    if (!decision) return;
    const response = await approveOrRejectVolunteeringHours(
      requestID,
      scholarshipID,
      decision,
      email
    );
    console.log(response);
    window.location.reload();
  };

  useEffect(() => {
    getAllVolunteerActivityHours().then((response) => {
      console.log(response);
      if (!response) return;
      if (!response.data) return;
      if (response.data.volunteerActivityHoursList.length === 0) return;
      setVolunteerActivityHoursList(response.data.volunteerActivityHoursList);
    });
  }, []);

  return (
    <div>
      <h1>Review Volunteer Hours</h1>
      <Table
        className={classes["table"]}
        id="sorted-virtualized-table"
        scroller={true}
      >
        <TableHead>
          <TableRow>
            <TableCell
              className={`${classes["table-cell"]} ${classes["table-header"]} ${classes["name"]}`}
            >
              Name
            </TableCell>
            <TableCell
              className={`${classes["big-cell"]}  ${classes["table-header"]} ${classes["email"]}`}
            >
              Email
            </TableCell>
            <TableCell
              className={`${classes["table-cell"]} ${classes["table-header"]} ${classes["activity-date"]}`}
            >
              Activity Date
            </TableCell>
            <TableCell
              className={`${classes["big-cell"]}  ${classes["table-header"]} ${classes["description"]}`}
            >
              Description
            </TableCell>
            <TableCell
              className={`${classes["table-cell"]} ${classes["table-header"]} ${classes["no-of-hours"]}`}
            >
              No of Hours
            </TableCell>
            <TableCell
              className={`${classes["table-cell"]} ${classes["table-header"]} ${classes["submission-date"]}`}
            >
              Submission Date
            </TableCell>
            <TableCell
              className={`${classes["table-cell"]} ${classes["table-header"]} ${classes["approve"]}`}
            >
              Approve
            </TableCell>
            <TableCell
              className={`${classes["table-cell"]} ${classes["table-header"]} ${classes["reject"]}`}
            >
              Reject
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {volunteerActivityHoursList.map((activity) => (
            <TableRow key={activity.requestID}>
              <TableCell
                className={`${classes["table-cell"]} ${classes["name"]}`}
              >
                {activity.name}
              </TableCell>
              <TableCell
                className={`${classes["table-cell"]} ${classes["email"]}`}
              >
                {activity.email}
              </TableCell>
              <TableCell
                className={`${classes["table-cell"]} ${classes["activity-date"]}`}
              >
                {activity.activityDate}
              </TableCell>
              <TableCell
                className={`${classes["table-cell"]} ${classes["description"]}`}
              >
                {activity.activityDescription}
              </TableCell>
              <TableCell
                className={`${classes["table-cell"]} ${classes["no-of-hours"]}`}
              >
                {activity.noOfHours}
              </TableCell>
              <TableCell
                className={`${classes["table-cell"]} ${classes["submission-date"]}`}
              >
                {activity.submissionDate}
              </TableCell>
              <TableCell
                className={`${classes["table-cell"]} ${classes["approve"]}`}
              >
                <Button
                  onClick={() => {
                    decisionHandler(
                      activity.requestID,
                      activity.scholarshipID,
                      "approved",
                      activity.email
                    );
                  }}
                >
                  Approve
                </Button>
              </TableCell>
              <TableCell
                className={`${classes["table-cell"]} ${classes["reject"]}`}
              >
                <Button
                  onClick={() => {
                    decisionHandler(
                      activity.requestID,
                      activity.scholarshipID,
                      "rejected",
                      activity.email
                    );
                  }}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewVolunteerHours;
