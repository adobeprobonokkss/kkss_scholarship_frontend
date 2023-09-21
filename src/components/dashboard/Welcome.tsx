import React from "react";

interface welcomeMessage {
  userName: string;
  role: string;
}

export const Welcome: React.FC<welcomeMessage> = ({ userName, role }) => {
  return (
    <div>
      {/* <p> {role}</p> */}
      <h2>
        Welcome - {userName} [{role}]
      </h2>
    </div>
  );
};
