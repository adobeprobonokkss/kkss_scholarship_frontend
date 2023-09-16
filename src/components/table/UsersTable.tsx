import React from "react";
import { ScholarshipData } from "./../../utils/types";
import { Link } from "react-router-dom";
import classes from "./../../styles/COMP_Table.module.css";
import { Status } from "./../../components/status/Status";
interface ScholarshipTableProps {
  scholarshipList: ScholarshipData[];
}
export const UsersTable: React.FC<ScholarshipTableProps> = (
  props: ScholarshipTableProps
) => {
  const { scholarshipList } = props;

  return (
    <table className={classes.my_table}>
      <thead>
        <tr>
          <th>Application ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Submission Date</th>
          <th>PM</th>
          <th>Reviewer</th>
        </tr>
      </thead>
      <tbody>
        {scholarshipList.map((item, index) => (
          <tr key={index}>
            <td>
              <Link to={`/scholarship-form/preview/${item.scholarshipID}`}>
                {item.scholarshipID}
              </Link>
            </td>
            <td>{item.name}</td>
            <td>
              <Status status={item.status ?? ""}></Status>
            </td>
            <td>{item.submissionDate}</td>
            <td>{item.programManagerEmail}</td>
            <td>{item.backgroundVerifierEmail}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
