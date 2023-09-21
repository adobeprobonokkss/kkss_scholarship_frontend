import React, { useState } from "react";
import ReactModal from "react-modal";
import classes from "./../styles/modal.module.css";
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
    // <ReactModal
    //   isOpen={isOpen}
    //   onRequestClose={onClose}
    //   contentLabel="Role Selection"
    // >
    //   <h2>Please select a role for user - {userName}</h2>
    //   <div>
    //     <label>
    //       <input
    //         type="radio"
    //         value="USER"
    //         checked={selectedRole === "USER"}
    //         onChange={handleRoleChange}
    //       />
    //       User
    //     </label>
    //     <label>
    //       <input
    //         type="radio"
    //         value="ADMIN"
    //         checked={selectedRole === "ADMIN"}
    //         onChange={handleRoleChange}
    //       />
    //       Admin
    //     </label>
    //     <label>
    //       <input
    //         type="radio"
    //         value="REVIEWER"
    //         checked={selectedRole === "REVIEWER"}
    //         onChange={handleRoleChange}
    //       />
    //       Background Verification Volunteer
    //     </label>
    //     <label>
    //       <input
    //         type="radio"
    //         value="PROGRAM_MANAGER"
    //         checked={selectedRole === "PROGRAM_MANAGER"}
    //         onChange={handleRoleChange}
    //       />
    //       Program Manager
    //     </label>
    //   </div>
    //   <button onClick={handleSubmit}>Submit</button>
    //   <button onClick={onClose}>Cancel</button>
    // </ReactModal>
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Role Selection"
      className={classes.custom_modal}
      overlayClassName="custom-overlay"
    >
      <div className={classes.modal_content}>
        <h3>Please select a role for user - {userName}</h3>
        <div className={classes.radio_options}>
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
                value="REVIEWER"
                checked={selectedRole === "REVIEWER"}
                onChange={handleRoleChange}
              />
              Background Verification Volunteer
            </label>
            <label>
              <input
                type="radio"
                value="PROGRAM_MANAGER"
                checked={selectedRole === "PROGRAM_MANAGER"}
                onChange={handleRoleChange}
              />
              Program Manager
            </label>
          </div>
        </div>
        <div className={classes.modal_buttons}>
          <button onClick={handleSubmit} className={classes.submit_button}>
            Submit
          </button>
          <button onClick={onClose} className={classes.cancel_button}>
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default CustomizedRoleSelection;
