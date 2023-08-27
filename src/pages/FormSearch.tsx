import { Button } from "@swc-react/button";
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
import { HelpText } from "@swc-react/help-text";
import React, { useState } from "react";

import classes from "../styles/FormSearch.module.css";
import {
  ScholarshipData,
  ScholarshipDataRequest,
  getScholarshipFormData,
} from "../services/ScholarshipFormService";

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
  const [selectedYear, setSelectedYear] = useState("2023");
  const years = [];

  for (let i = 2000; i <= 2100; i++) {
    years.push(i.toString());
  }

  const handleSearchOptionChange = (event: any) => {
    setSearchOption(event.target.value);
  };

  const handleSearchQueryChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    console.log("DEBUG", searchQuery);
    if (searchQuery === "") {
      setSearchResults([]);
      return;
    }
    let scholarshipData: (ScholarshipData & ResultType)[] = [];
    const request: ScholarshipDataRequest = {
      field: searchOption,
      keyword: searchQuery,
      year: selectedYear,
    };
    console.log("DEBUG", request);
    scholarshipData = (await getScholarshipFormData(request)) ?? [];
    setSearchResults(
      Array.isArray(scholarshipData) ? scholarshipData : [scholarshipData]
    );
  };

  return (
    <>
      <div className={classes["form-search"]}>
        <div className={classes["form-search-area"]}>
          <div className={classes["form-search__search-year"]}>
            <Picker
              value={selectedYear}
              change={(event: any) => setSelectedYear(event.target.value)}
              placeholder="Select a year"
              style={{ width: "100%" }}
            >
              {years.map((year) => (
                <MenuItem value={year}>{year}</MenuItem>
              ))}
            </Picker>
          </div>
          <div className={classes["form-search__search-options"]}>
            <Picker
              value={searchOption}
              change={handleSearchOptionChange}
              placeholder="Select an option"
              style={{ width: "100%" }}
            >
              <MenuItem value="scholarshipID">Scholarship ID</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="phNumber">Phone Number</MenuItem>
              <MenuItem value="name">Applicant Name</MenuItem>
            </Picker>
          </div>
          <div className={classes["form-search__search-bar"]}>
            <Textfield
              value={searchQuery}
              change={handleSearchQueryChange}
              style={{ width: "100%" }}
              placeholder="Enter search query"
            />
          </div>
          <div className={classes["form-search__search-button"]}>
            <Button onClick={handleSearchButtonClick} style={{ width: "100%" }}>
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className={classes["form-search__search-help"]}>
        <HelpText variant="negative" icon>
          Please use search responsibly. Do not spam the search button.
        </HelpText>
        <HelpText variant="neutral" icon>
          Partial keyword search is supported but it will only fetch records
          that start with or end with the keyword.
        </HelpText>
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
                  <TableRow key={searchResult.scholarshipID}>
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
