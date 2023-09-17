import React, { FC, useEffect, useState } from "react";
import "./../styles/UserDashBoard.css"; // Import the CSS file for styling
import { Welcome } from "./../components/dashboard/Welcome";
import { UsersTable } from "./../components/table/UsersTable";
import { Tile } from "./../components/tile/Tiles";
import { getUsersInfo } from "./../utils/shared";
import { Button } from "@swc-react/button";
import { Link } from "react-router-dom";
import classes from "../styles/userDashboard.module.css";
import { ApplicationStatus, RoleType } from "./../utils/types";
import axios from "axios";
import { ScholarshipData, enumColors } from "./../utils/types";
interface Role {
  role: string | null;
}

// Convert the record's values into an array
const statusArray = Object.keys(ApplicationStatus);

const BACKENDURL = process.env.REACT_APP_BACK_END_URL;

function getUserDashBoard(decoded: any) {
  const [scholarshipList, setScholarShipList] = useState<ScholarshipData[]>([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${BACKENDURL}/api/v1/getScholarshipFormData`,
        { withCredentials: true }
      );
      setScholarShipList(response.data.scholarshipFormData);
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
        {/* <div className={classes.btn_style}>
          <Button>
            <Link className={classes.styled_link} to="/scholarship-form">
              Apply for scholarship
            </Link>
          </Button>
        </div> */}
        <div className={classes.btn_style}>
          <Button>
            <Link className={classes.styled_link} to="/">
              Log Volunteering Hour
            </Link>
          </Button>
        </div>
        <div>
          <h3>Total volunteeting Hour contributed - {5}/150</h3>
        </div>
        <div>
          <h1>Your submitted application</h1>
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
  // useEffect(() => {
  //   console.log("from useEffect", selectedYear);
  // }, [selectedYear]);
  return (
    <>
      <div>
        <b>Please Select Year - </b>
        <select
          onChange={(e) => {
            setSelectedYear(e.target.value);
            console.log("year selected " + e.target.value);
            // console.log(selectedYear);
          }}
        >
          <option selected={selectedYear == "2022"}>2022</option>
          <option selected={selectedYear == "2023"}>2023</option>
          <option selected={selectedYear == "2024"}>2024</option>
        </select>
      </div>
      <div>
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
      const response = await axios.get(
        `${BACKENDURL}/api/v1/getScholarshipFormData`,
        { withCredentials: true }
      );
      setScholarShipList(response.data.scholarshipFormData);
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
          <h4>APPLICATION IN REVIEW</h4>
        </div>
        <UsersTable scholarshipList={scholarshipList}></UsersTable>
      </div>
    </div>
  );
}

function getProgramManagerNavigationBar() {
  return <></>;
}

const UserDashBoard: React.FC = () => {
  const { decoded } = getUsersInfo();
  // const scholarShipList=
  //make a request to check if client side data has not been updated

  if (decoded?.role === RoleType.ADMIN) {
    console.log("executing this");
    return getAdminDashBoard();
  } else if (decoded?.role === RoleType.PROGRAM_MANAGER) {
    return getProgramManagerNavigationBar();
  } else if (decoded?.role === RoleType.REVIEWER) {
    return getReviewerDashBoard(decoded);
  } else {
    return getUserDashBoard(decoded);
  }
};

export default UserDashBoard;
