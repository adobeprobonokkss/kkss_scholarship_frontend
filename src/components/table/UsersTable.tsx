import React from "react";
import { ScholarshipData } from "./../../utils/types";
import { Link } from "react-router-dom";
import classes from "./../../styles/COMP_Table.module.css";
import { Status } from "./../../components/status/Status";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@swc-react/table";
interface ScholarshipTableProps {
  scholarshipList: ScholarshipData[];
}

export const UsersTable: React.FC<ScholarshipTableProps> = (
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
