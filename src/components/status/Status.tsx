import React from "react";
import { ApplicationStatus, enumColors } from "./../../utils/types";

interface statusType {
  status: string;
}
// const enumColors: Record<ApplicationStatus, string> = {
//   [ApplicationStatus.submitted]: "#454ADE", //
//   [ApplicationStatus.initial_review_completed]: "green", //
//   [ApplicationStatus.background_check_completed]: "#C17817", //
//   [ApplicationStatus.final_review_completed]: "green",
//   [ApplicationStatus.approved]: "#3A914D",
//   [ApplicationStatus.rejected]: "#EE4266", //
// };

// function getValueFromKey(key: string): Status | undefined {
//   for (const statusKey in Status) {
//     if (Status.hasOwnProperty(statusKey) && Status[statusKey] === key) {
//       return Status[statusKey] as Status;
//     }
//   }
//   return undefined; // Return undefined if the key is not found
// }
export const Status: React.FC<statusType> = (props: statusType) => {
  const { status } = props;
  console.log(status);
  const statusValue: string = (ApplicationStatus as any)[status];

  console.log(enumColors[statusValue as ApplicationStatus], "enum");
  const style = {
    backgroundColor: enumColors[statusValue as ApplicationStatus],
    padding: ".25rem",
    "font-weight": "bold",
    color: "white",
    "border-radius": "0.3rem",
  };
  return <span style={style}>{statusValue}</span>;
};
