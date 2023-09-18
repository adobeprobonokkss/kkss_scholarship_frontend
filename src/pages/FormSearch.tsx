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
import { Icon } from "@swc-react/icon";
import { Link } from "@swc-react/link";
import React, { useEffect, useState } from "react";

import classes from "../styles/FormSearch.module.css";
import {
  ScholarshipData,
  ScholarshipDataRequest,
  getScholarshipFormData,
  scholarshipApplicationStatusesMap,
} from "../services/ScholarshipFormService";
import { useNavigate, useParams } from "react-router-dom";
import { scholarshipApplicationStatuses } from "../services/ScholarshipFormService";
import { RoleType } from "../utils/types";
import { getUsersInfo } from "../utils/shared";

const FormSearch: React.FC = () => {
  let routeParams = useParams();
  const [searchOption, setSearchOption] = useState("scholarshipID");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ScholarshipData[]>([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const years = ["All"];
  const statuses = scholarshipApplicationStatuses;
  const userInfo = getUsersInfo().decoded;
  const isAdmin = userInfo?.role == RoleType.ADMIN;
  const isPM = userInfo?.role == RoleType.PROGRAM_MANAGER;
  const isReviewer = userInfo?.role == RoleType.REVIEWER;
  const enableSearch = isAdmin || isPM || isReviewer;
  const navigate = useNavigate();

  for (let i = 2021; i <= 2100; i++) {
    years.push(i.toString());
  }

  useEffect(() => {
    console.log("queryYear", routeParams.year);
    console.log("queryStatus", routeParams.status);
    if (!enableSearch) {
      navigate("/");
    }
    if (routeParams.year) {
      setSelectedYear(routeParams.year);
    }
    if (routeParams.status) {
      setSelectedStatus(routeParams.status);
    }
  }, [routeParams.year, routeParams.status]);

  useEffect(() => {
    fetchScholarshipApplications();
  }, [selectedYear, selectedStatus]);

  const handleSearchOptionChange = (event: any) => {
    setSearchOption(event.target.value);
  };

  const handleSearchQueryChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    await fetchScholarshipApplications();
  };

  const fetchScholarshipApplications = async () => {
    let scholarshipData: ScholarshipData[] = [];
    const request: ScholarshipDataRequest = {
      field: searchOption,
      keyword: searchQuery,
      year: selectedYear !== "All" ? selectedYear : undefined,
      status: selectedStatus !== "all" ? selectedStatus : undefined,
    };
    scholarshipData = (await getScholarshipFormData(request)) ?? [];
    setSearchResults(
      Array.isArray(scholarshipData) ? scholarshipData : [scholarshipData]
    );
  };
  console.log("searchResults", searchResults);

  return (
    <>
      {enableSearch && (
        <>
          <div className={classes["form-search"]}>
            <div className={classes["form-search-area"]}>
              <div className={classes["form-search__search-year"]}>
                <Picker
                  value={selectedYear}
                  change={(event: any) => setSelectedYear(event.target.value)}
                  placeholder="Select a year"
                  style={{ width: "100%", maxHeight: "220px" }}
                >
                  {years.map((year) => (
                    <MenuItem value={year}>{year}</MenuItem>
                  ))}
                </Picker>
              </div>
              <div className={classes["form-search__search-status"]}>
                <Picker
                  value={selectedStatus}
                  change={(event: any) => setSelectedStatus(event.target.value)}
                  placeholder="Select a status"
                  style={{ width: "100%" }}
                >
                  {statuses.map((status) => (
                    <MenuItem value={status[0]}>{status[1]}</MenuItem>
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
                <Button
                  onClick={handleSearchButtonClick}
                  style={{ width: "100%" }}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
          <div className={classes["form-search__search-help-container"]}>
            <div className={classes["form-search__search-help"]}>
              <HelpText size="l" variant="negative" icon>
                Please use search responsibly. Do not spam the search button.
              </HelpText>
              <HelpText size="l" variant="neutral" icon>
                <Icon
                  style={{
                    position: "relative",
                    width: "18px",
                    height: "18px",
                    margin: "0px 6px 0 0",
                    top: "4px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 0 18 18"
                    width="18"
                  >
                    <title>InfoMedium</title>
                    <rect
                      id="ToDelete"
                      fill="#ff13dc"
                      opacity="0"
                      width="18"
                      height="18"
                    />
                    <path d="M9,1a8,8,0,1,0,8,8A8,8,0,0,0,9,1ZM8.85,3.15a1.359,1.359,0,0,1,1.43109,1.28286q.00352.06452.00091.12914A1.332,1.332,0,0,1,8.85,5.994,1.353,1.353,0,0,1,7.418,4.561,1.359,1.359,0,0,1,8.72191,3.14905Q8.78595,3.14652,8.85,3.15ZM11,13.5a.5.5,0,0,1-.5.5h-3a.5.5,0,0,1-.5-.5v-1a.5.5,0,0,1,.5-.5H8V9H7.5A.5.5,0,0,1,7,8.5v-1A.5.5,0,0,1,7.5,7h2a.5.5,0,0,1,.5.5V12h.5a.5.5,0,0,1,.5.5Z" />
                  </svg>
                </Icon>
                Partial keyword search is supported but it will only fetch
                records that start with or end with the keyword.
              </HelpText>
              <HelpText size="l" variant="neutral" icon>
                <Icon
                  style={{
                    position: "relative",
                    width: "18px",
                    height: "18px",
                    margin: "0px 6px 0 0",
                    top: "4px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 0 18 18"
                    width="18"
                  >
                    <title>InfoMedium</title>
                    <rect
                      id="ToDelete"
                      fill="#ff13dc"
                      opacity="0"
                      width="18"
                      height="18"
                    />
                    <path d="M9,1a8,8,0,1,0,8,8A8,8,0,0,0,9,1ZM8.85,3.15a1.359,1.359,0,0,1,1.43109,1.28286q.00352.06452.00091.12914A1.332,1.332,0,0,1,8.85,5.994,1.353,1.353,0,0,1,7.418,4.561,1.359,1.359,0,0,1,8.72191,3.14905Q8.78595,3.14652,8.85,3.15ZM11,13.5a.5.5,0,0,1-.5.5h-3a.5.5,0,0,1-.5-.5v-1a.5.5,0,0,1,.5-.5H8V9H7.5A.5.5,0,0,1,7,8.5v-1A.5.5,0,0,1,7.5,7h2a.5.5,0,0,1,.5.5V12h.5a.5.5,0,0,1,.5.5Z" />
                  </svg>
                </Icon>
                You can search with keywords by just selecting one of the two
                options, Status or Year.
              </HelpText>
              <HelpText size="l" variant="neutral" icon>
                <Icon
                  style={{
                    position: "relative",
                    width: "18px",
                    height: "18px",
                    margin: "0px 6px 0 0",
                    top: "4px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 0 18 18"
                    width="18"
                  >
                    <title>InfoMedium</title>
                    <rect
                      id="ToDelete"
                      fill="#ff13dc"
                      opacity="0"
                      width="18"
                      height="18"
                    />
                    <path d="M9,1a8,8,0,1,0,8,8A8,8,0,0,0,9,1ZM8.85,3.15a1.359,1.359,0,0,1,1.43109,1.28286q.00352.06452.00091.12914A1.332,1.332,0,0,1,8.85,5.994,1.353,1.353,0,0,1,7.418,4.561,1.359,1.359,0,0,1,8.72191,3.14905Q8.78595,3.14652,8.85,3.15ZM11,13.5a.5.5,0,0,1-.5.5h-3a.5.5,0,0,1-.5-.5v-1a.5.5,0,0,1,.5-.5H8V9H7.5A.5.5,0,0,1,7,8.5v-1A.5.5,0,0,1,7.5,7h2a.5.5,0,0,1,.5.5V12h.5a.5.5,0,0,1,.5.5Z" />
                  </svg>
                </Icon>
                If search results in "no results found", please make sure there
                is not space before and after the keyword. Also try both start
                with and end with in case of partial keyword search.
              </HelpText>
            </div>
          </div>
        </>
      )}
      <div className={classes["form-search__search-results"]}>
        {searchResults.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Scholarship ID</TableCell>
                <TableCell>Applicant</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Background Verifier</TableCell>
                <TableCell>Program Manager</TableCell>
                <TableCell>Submission Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults &&
                searchResults.map((searchResult: ScholarshipData) => (
                  <TableRow>
                    <TableCell>
                      <Link
                        onClick={() =>
                          navigate(
                            `/scholarship-form/preview/${searchResult.scholarshipID}`
                          )
                        }
                      >
                        {searchResult.scholarshipID}
                      </Link>
                    </TableCell>
                    <TableCell>{searchResult.name}</TableCell>
                    <TableCell>
                      {searchResult.status &&
                        scholarshipApplicationStatusesMap.get(
                          searchResult.status
                        )}
                    </TableCell>
                    <TableCell>
                      {searchResult.backgroundVerifierEmail}
                    </TableCell>
                    <TableCell>{searchResult.programManagerEmail}</TableCell>
                    <TableCell>
                      {searchResult.submissionDate
                        ? searchResult.submissionDate
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <div className={classes["form-search__search-results-empty"]}>
            No results found
          </div>
        )}
      </div>
    </>
  );
};

export default FormSearch;
