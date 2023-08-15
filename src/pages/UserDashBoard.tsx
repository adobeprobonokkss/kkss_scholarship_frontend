import React from "react";
import "./../styles/UserDashBoard.css"; // Import the CSS file for styling

const UserDashBoard: React.FC = () => {
  // function UserDashBoard(props: any) {
  return (
    <div className="dashboard-container">
      <h1>Welcome Users This is your Dashboard</h1>
      <br></br>
      <div className="dashboard-card">
        <h2>Users</h2>
        <p>1500</p>
      </div>
      <div className="dashboard-card">
        <h2>Orders</h2>
        <p>500</p>
      </div>
      <div className="dashboard-card">
        <h2>Revenue</h2>
        <p>$25,000</p>
      </div>
      <div className="dashboard-card">
        <h2>Visits</h2>
        <p>10,000</p>
      </div>
    </div>
  );
};

export default UserDashBoard;
