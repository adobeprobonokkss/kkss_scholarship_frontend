import React, { lazy } from "react";
const { Link } = await import("react-router-dom");
const { Table, TableBody, TableCell, TableHead, TableRow } = await import(
  "@swc-react/table"
);

import { ScholarshipData } from "./../../utils/types";
import classes from "./../../styles/COMP_Table.module.css";
const Status = await lazy(() => import("../status/Status"));

interface ScholarshipTableProps {
  scholarshipList: ScholarshipData[];
}

const UsersTable: React.FC<ScholarshipTableProps> = (
  props: ScholarshipTableProps
) => {
  const { scholarshipList } = props;

  return (
    <Table className={classes.my_table}>
      <TableHead>
        <TableRow>
          <TableCell>Application ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Submission Date</TableCell>
          <TableCell>PM</TableCell>
          <TableCell>Reviewer</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scholarshipList?.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <Link to={`/scholarship-form/preview/${item.scholarshipID}`}>
                {item.scholarshipID}
              </Link>
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Status status={item.status ?? ""}></Status>
            </TableCell>
            <TableCell>{item.submissionDate}</TableCell>
            <TableCell>{item.programManagerEmail}</TableCell>
            <TableCell>{item.backgroundVerifierEmail}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
