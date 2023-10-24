import React, { useEffect, useState } from "react";
import { Button } from "@swc-react/button";
import { Link } from "react-router-dom";
import Welcome from "../components/dashboard/Welcome";
import UsersTable from "../components/table/UsersTable";
import Tile from "../components/tile/Tiles";

import { getUsersInfo } from "./../utils/shared";
import classes from "../styles/userDashboard.module.css";
import { ApplicationStatus, RoleType } from "./../utils/types";
import { ScholarshipData } from "./../utils/types";
import {
  ScholarshipDataRequest,
  getScholarshipFormData,
} from "../services/ScholarshipFormService";

import "./../styles/UserDashBoard.css"; // Import the CSS file for styling
import { Icon } from "@swc-react/icon";
import ClockIcon from "../components/ClockIcon";
import AddIcon from "../components/AddIcon";
import { Picker } from "@swc-react/picker";
import { MenuItem } from "@swc-react/menu";

import { Icon } from "@swc-react/icon";
import ClockIcon from "../components/ClockIcon";
import AddIcon from "../components/AddIcon";
import { Picker } from "@swc-react/picker";
import { MenuItem } from "@swc-react/menu";

interface Role {
  role: string | null;
}

const validYearOption = [
  2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032,
  2034, 2035,
];
// Convert the record's values into an array
const statusArray = Object.keys(ApplicationStatus);

function getUserDashBoard(decoded: any) {
  const [scholarshipList, setScholarShipList] = useState<ScholarshipData[]>([]);
  useEffect(() => {
    (async () => {
      const request: ScholarshipDataRequest = {
        year: new Date().getFullYear().toString(),
        field: "email",
        keyword: decoded?.email ?? "",
      };
      const response = await getScholarshipFormData(request);
      console.log(response);
      setScholarShipList(response);
    })();
  }, []);

  // console.log(response);
  return (
    <div>
      <Welcome
        userName={decoded?.name ?? "Hi"}
        role={decoded?.role ?? ""}
      ></Welcome>
      <div>
        <div className={classes.btn_style}>
          <Button>
            <Icon slot="icon">
              <AddIcon />
            </Icon>
            <Link className={classes.styled_link} to="/scholarship-form">
              Apply for scholarship
            </Link>
          </Button>
          <Button>
            <Icon slot="icon">
              <ClockIcon />
            </Icon>
            <Link className={classes.styled_link} to="/past-applications">
              Past Applications
            </Link>
          </Button>
        </div>

        <div>
          <h1 className={classes["submitted-heading"]}>
            Your submitted application this year
          </h1>
        </div>
        <UsersTable scholarshipList={scholarshipList}></UsersTable>
      </div>
    </div>
  );
}

function getAdminDashBoard() {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  return (
    <>
      <div className={classes["select-year-container"]}>
        <b className={classes["select-year"]}>Please Select Year</b>

        <Picker
          className={classes["year-picker"]}
          value={selectedYear}
          change={(e: any) => {
            e.preventDefault();
            setSelectedYear(e.target.value);
            console.log("year selected " + e.target.value);
          }}
        >
          {validYearOption.map((yearvalue) => (
            <MenuItem key={`years-${yearvalue}`} value={`${yearvalue}`}>
              {yearvalue}
            </MenuItem>
          ))}
        </Picker>
      </div>
      <div className={classes["tiles"]}>
        {statusArray.map<any>((item: string) => {
          return <Tile color="" statusText={item} year={selectedYear} />;
        })}
      </div>
    </>
  );
}

function getReviewerDashBoard(decoded: any) {
  const [scholarshipList, setScholarShipList] = useState<ScholarshipData[]>([]);
  useEffect(() => {
    (async () => {
      const request: ScholarshipDataRequest = {
        year: new Date().getFullYear().toString(),
        field: "backgroundVerifierEmail",
        keyword: decoded?.email ?? "",
      };
      const response = await getScholarshipFormData(request);
      console.log(response);
      setScholarShipList(response);
    })();
  }, []);

  // console.log(response);
  return (
    <div>
      <Welcome
        userName={decoded?.name ?? "Hi"}
        role={decoded?.role ?? ""}
      ></Welcome>
      <hr></hr>
      <div>
        <div>
          <h2>APPLICATION IN REVIEW</h2>
        </div>
        <UsersTable scholarshipList={scholarshipList}></UsersTable>
      </div>
    </div>
  );
}

function getProgramManagerDashBoard() {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  return (
    <>
      <div className={classes["select-year-container"]}>
        <b className={classes["select-year"]}>Please Select Year</b>
        <Picker
          className={classes["year-picker"]}
          value={selectedYear}
          change={(e: any) => {
            e.preventDefault();
            setSelectedYear(e.target.value);
            console.log("year selected " + e.target.value);
          }}
        >
          {validYearOption.map((yearvalue) => (
            <MenuItem key={`years-${yearvalue}`} value={`${yearvalue}`}>
              {yearvalue}
            </MenuItem>
          ))}
        </Picker>
      </div>
      <div className={classes["tiles"]}>
        {statusArray
          .filter((item) => !(item === "approved" || item === "rejected"))
          .map<any>((item: string) => {
            return <Tile color="" statusText={item} year={selectedYear} />;
          })}
      </div>
    </>
  );
}

const UserDashBoard: React.FC = () => {
  const { decoded } = getUsersInfo();

  if (decoded?.role === RoleType.ADMIN) {
    console.log("executing this");
    return getAdminDashBoard();
  } else if (decoded?.role === RoleType.PROGRAM_MANAGER) {
    return getProgramManagerDashBoard();
  } else if (decoded?.role === RoleType.REVIEWER) {
    return getReviewerDashBoard(decoded);
  } else {
    return getUserDashBoard(decoded);
  }
};

export default UserDashBoard;
