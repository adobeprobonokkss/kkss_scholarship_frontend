import { FieldLabel } from "@swc-react/field-label";
import { Picker } from "@swc-react/picker";
import { MenuItem } from "@swc-react/menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@swc-react/table";
import { Textfield } from "@swc-react/textfield";
import React, { useEffect, useState } from "react";

import classes from "../styles/FormSearch.module.css";
import {
  ScholarshipData,
  getAllScholarshipFormData,
} from "../services/ScholarshipFormService";
import Fuse from "fuse.js";

export type ResultType = {
  scholarshipID: string;
  name: string;
  status: string;
  backgroundVerifier: string;
  programManager: string;
  dateOfSubmission: string;
};

const FormSearch: React.FC = () => {
  const [searchOption, setSearchOption] = useState("scholarshipID");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    (ScholarshipData & ResultType)[]
  >([]);
  const [scholarshipFormList, setScholarshipFormList] = useState<
    (ScholarshipData & ResultType)[]
  >([]);
  const FUSE_OPTIONS = {
    keys: ["scholarshipID", "name", "email", "phNumber"],
  };
  const years = [];

  const populateYears = () => {
    let years = [];
  };

  const handleSearchOptionChange = (event: any) => {
    setSearchOption(event.target.value);
  };

  const handleSearchQueryChange = (event: any) => {
    setSearchQuery(event.target.value);
    if (searchQuery === "") {
      setSearchResults([]);
      return;
    }

    const searchRes = new Fuse(scholarshipFormList, FUSE_OPTIONS).search(
      searchQuery
    );
    setSearchResults(searchRes as unknown as (ScholarshipData & ResultType)[]);
  };

  const fetchScholarshipFormData = async () => {
    getAllScholarshipFormData().then((res) => {
      console.log(res);
      setScholarshipFormList(res);
      setSearchResults(res);
    });
  };

  useEffect(() => {
    console.log("scholarshipFormList", scholarshipFormList);
    fetchScholarshipFormData();
  }, []);

  return (
    <>
      <div className={classes["form-search"]}>
        <div className={classes["form-search-area"]}>
          <div className={classes["form-search__search-options"]}>
            <FieldLabel>Year</FieldLabel>
            <Picker
              value={searchOption}
              onChange={handleSearchOptionChange}
              style={{ width: "100%" }}
            ></Picker>
          </div>
          <div className={classes["form-search__search-bar"]}>
            <Textfield
              value={searchQuery}
              change={handleSearchQueryChange}
              style={{ width: "100%" }}
              placeholder="Enter search query"
            />
          </div>
        </div>
      </div>
      <div className={classes["form-search__search-results"]}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Scholarship ID</TableCell>
              <TableCell>Applicant</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Background Verifier</TableCell>
              <TableCell>Program Manager</TableCell>
              <TableCell>Date of Submission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults &&
              searchResults.map(
                (searchResult: ScholarshipData & ResultType) => (
                  <TableRow>
                    <TableCell>{searchResult.scholarshipID}</TableCell>
                    <TableCell>{searchResult.name}</TableCell>
                    <TableCell>{searchResult.status}</TableCell>
                    <TableCell>{searchResult.backgroundVerifier}</TableCell>
                    <TableCell>{searchResult.programManager}</TableCell>
                    <TableCell>{searchResult.dateOfSubmission}</TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FormSearch;

/* CSS styling for FormSearch.tsx component. */
/*

*/
