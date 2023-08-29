import React from "react";
import "./../styles/UserDashBoard.css"; // Import the CSS file for styling
import { Welcome } from "./../components/dashboard/Welcome";
import { getUsersInfo } from "./../utils/shared";
const UserDashBoard: React.FC = () => {
  const { decoded } = getUsersInfo();

  return (
    <div className="dashboard-container">
      <Welcome
        userName={decoded?.name ?? ""}
        role={decoded?.role ?? ""}
      ></Welcome>
    </div>
  );
};

export default UserDashBoard;
