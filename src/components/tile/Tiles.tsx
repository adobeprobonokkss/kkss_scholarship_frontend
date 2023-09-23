import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { enumColors, ApplicationStatus } from "./../../utils/types";
import { Link } from "react-router-dom";
const BACKENDURL = process.env.REACT_APP_BACK_END_URL;

interface tileType {
  color: string;
  statusText: string;
  year: string;
}
export const Tile: React.FC<tileType> = ({ color, statusText, year }) => {
  const statusValue: string = (ApplicationStatus as any)[statusText];
  const tileColor: string = enumColors[statusValue as ApplicationStatus];
  const [totalCount, setTotalCount] = useState("...");
  useEffect(() => {
    (async () => {
      if (true) {
        const response = await axios.post(
          `${BACKENDURL}/api/v1/protected/getCountHandler`,
          { year: year, status: statusText },
          { withCredentials: true }
        );
        setTotalCount(response.data.count);
      } else {
        console.log("feature is off ...");
      }
    })();
  }, [year]);

  const tileStyle: React.CSSProperties = {
    backgroundColor: tileColor,
    padding: "1%",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    width: "16%",
    margin: "1%",
    display: "inline-block",
    color: "white",
  };

  const textStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: "none",
    color: "white" /* Remove the default underline */,
  };

  return (
    <div style={tileStyle}>
      <div style={textStyle}>{totalCount}</div>
      <Link style={linkStyle} to={`/search/${year}/${statusText}`}>
        <div>{statusValue}</div>
      </Link>
    </div>
  );
};
