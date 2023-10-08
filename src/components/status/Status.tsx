import React from "react";
import { ApplicationStatus, enumColors } from "./../../utils/types";

interface statusType {
  status: string;
}

const Status: React.FC<statusType> = (props: statusType) => {
  const { status } = props;
  console.log(status);
  const statusValue: string = (ApplicationStatus as any)[status];

  console.log(enumColors[statusValue as ApplicationStatus], "enum");
  const style = {
    backgroundColor: enumColors[statusValue as ApplicationStatus],
    padding: ".25rem",
    fontWeight: "bold",
    color: "white",
    borderRadius: "0.3rem",
  };
  return <span style={style}>{statusValue}</span>;
};

export default Status;
