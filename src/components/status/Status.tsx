import React from "react";
import { ApplicationStatus } from "./../../utils/types";

interface statusType {
  status: string;
}
const enumColors: Record<ApplicationStatus, string> = {
  [ApplicationStatus.submitted]: "#454ADE", //
  [ApplicationStatus.inReview]: "#540D6E", //
  [ApplicationStatus.verificationDone]: "#C17817", //
  [ApplicationStatus.infoRequired]: "green",
  [ApplicationStatus.reviewCompleted]: "green",
  [ApplicationStatus.approve]: "#3A914D",
  [ApplicationStatus.reject]: "#EE4266", //
};

export const Status: React.FC<statusType> = (props: statusType) => {
  const { status } = props;
  console.log(status);
  const style = {
    backgroundColor: enumColors[status as ApplicationStatus],
    padding: ".25rem",
    "font-weight": "bold",
    color: "white",
    "border-radius": "0.3rem",
  };
  return <span style={style}>{status}</span>;
};
