import React, { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");
interface CustomizedRoleSelectionProps {
  isOpen: boolean;
  userName: string | null;
  onClose: () => void;
  onSubmit: (selectedRole: string) => void;
}

const CustomizedRoleSelection: React.FC<CustomizedRoleSelectionProps> = ({
  isOpen,
  userName,
  onClose,
  onSubmit,
}) => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedRole) {
      onSubmit(selectedRole);
      setSelectedRole("");
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Role Selection"
    >
      <h2>Please select a role for user - {userName}</h2>
      <div>
        <label>
          <input
            type="radio"
            value="USER"
            checked={selectedRole === "USER"}
            onChange={handleRoleChange}
          />
          User
        </label>
        <label>
          <input
            type="radio"
            value="ADMIN"
            checked={selectedRole === "ADMIN"}
            onChange={handleRoleChange}
          />
          Admin
        </label>
        <label>
          <input
            type="radio"
            value="VOLUNTEER"
            checked={selectedRole === "VOLUNTEER"}
            onChange={handleRoleChange}
          />
          Volunteer
        </label>
        <label>
          <input
            type="radio"
            value="PROGRAM MANAGER"
            checked={selectedRole === "PROGRAM MANAGER"}
            onChange={handleRoleChange}
          />
          Program Manager
        </label>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </ReactModal>
  );
};

export default CustomizedRoleSelection;
