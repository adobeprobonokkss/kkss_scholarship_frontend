import React from "react";

interface welcomeMessage {
  userName: string;
  role: string;
}

export const Welcome: React.FC<welcomeMessage> = ({ userName, role }) => {
  return (
    <h3>
      Welocme {role} {userName}
    </h3>
  );
};
