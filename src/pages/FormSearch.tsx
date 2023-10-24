const { Button } = await import("@swc-react/button");
const { Picker } = await import("@swc-react/picker");
const { MenuItem } = await import("@swc-react/menu");
const { Table, TableBody, TableCell, TableHead, TableRow } = await import(
  "@swc-react/table"
);
const { Textfield } = await import("@swc-react/textfield");
const { HelpText } = await import("@swc-react/help-text");
const { Icon } = await import("@swc-react/icon");
const { Link } = await import("@swc-react/link");
const { useNavigate, useParams } = await import("react-router-dom");
import React, { lazy, useEffect, useState } from "react";

import classes from "../styles/FormSearch.module.css";
import {
  ScholarshipData,
  ScholarshipDataRequest,
  getScholarshipFormData,
} from "../services/ScholarshipFormService";
import { scholarshipApplicationStatuses } from "../services/ScholarshipFormService";
import { RoleType, VolunteerRecordDetails } from "../utils/types";
import { getUsersInfo } from "../utils/shared";
import { getVolunteerHoursByScholarshipIDList } from "../services/VolunteerService";
const HelpTextIcon = lazy(() => import("../components/HelpTextIcon"));
const Status = lazy(() => import("../components/status/Status"));

const FormSearch: React.FC = () => {
  let routeParams = useParams();
  const [searchOption, setSearchOption] = useState("scholarshipID");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ScholarshipData[]>([]);
  const [selectedYear, setSelectedYear] = useState("-");
  const [selectedStatus, setSelectedStatus] = useState("-");
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
    if (selectedYear === "-" || selectedStatus === "-") return;
    fetchScholarshipApplications();
    console.log("reproducible- ", selectedYear, selectedStatus);
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
      limit: 50,
    };

    scholarshipData = (await getScholarshipFormData(request)) ?? [];
    const volunteerHoursList = await fetchVolunteerHours(scholarshipData);
    if (volunteerHoursList) {
      scholarshipData.forEach((scholarshipData) => {
        volunteerHoursList.forEach((volunteerHours: VolunteerRecordDetails) => {
          if (
            scholarshipData?.scholarshipID == volunteerHours?.scholarshipID &&
            scholarshipData?.status == "approved"
          ) {
            scholarshipData.volunteerHours = volunteerHours?.approvedHours;
          }
        });
      });
      console.log("ret", request);
    }

    console.log("scholarshipData after scholarshipData", scholarshipData);

    setSearchResults(
      Array.isArray(scholarshipData) ? scholarshipData : [scholarshipData]
    );
  };

  const fetchVolunteerHours = async (scholarshipData: ScholarshipData[]) => {
    const scholarshipIDList: string[] = [];
    console.log("scholarshipData", scholarshipData);
    scholarshipData.forEach((searchResult) => {
      if (searchResult?.scholarshipID && searchResult?.status == "approved")
        scholarshipIDList.push(searchResult?.scholarshipID.trim());
    });
    console.log("scholarshipIDList", scholarshipIDList);
    if (scholarshipIDList.length == 0) return;
    const response = await getVolunteerHoursByScholarshipIDList(
      scholarshipIDList
    );
    console.log("Volunteer Hours", response);
    return response?.data && response?.data?.volunteerHoursList;
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
                  <HelpTextIcon />
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
                  <HelpTextIcon />
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
                  <HelpTextIcon />
                </Icon>
                If search results in "no results found", please make sure there
                is not space before and after the keyword. Also try both start
                with and end with in case of partial keyword search.
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
                  <HelpTextIcon />
                </Icon>
                Only 50 records will be fetched at a time. Please use the
                filters to narrow down your search.
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
                <TableCell className={classes["table-cell"]}>
                  Scholarship ID
                </TableCell>
                <TableCell className={classes["table-cell"]}>
                  Applicant
                </TableCell>
                <TableCell className={classes["table-cell"]}>Status</TableCell>
                <TableCell className={classes["table-cell"]}>
                  Background Verifier
                </TableCell>
                <TableCell className={classes["table-cell"]}>
                  Program Manager
                </TableCell>
                <TableCell className={classes["table-cell"]}>
                  Submission Date
                </TableCell>
                <TableCell className={classes["table-cell"]}>
                  Volunteer Hours
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults &&
                searchResults.map((searchResult: ScholarshipData) => (
                  <TableRow>
                    <TableCell className={classes["table-cell"]}>
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
                    <TableCell className={classes["table-cell"]}>
                      {searchResult.name}
                    </TableCell>
                    <TableCell className={classes["table-cell"]}>
                      <Status status={searchResult.status ?? ""}></Status>
                      {/* {searchResult.status &&
                        scholarshipApplicationStatusesMap.get(
                          searchResult.status
                        )}  */}
                    </TableCell>
                    <TableCell className={classes["table-cell"]}>
                      {searchResult.backgroundVerifierEmail}
                    </TableCell>
                    <TableCell className={classes["table-cell"]}>
                      {searchResult.programManagerEmail}
                    </TableCell>
                    <TableCell className={classes["table-cell"]}>
                      {searchResult.submissionDate
                        ? searchResult.submissionDate
                        : "N/A"}
                    </TableCell>
                    <TableCell className={classes["table-cell"]}>
                      {searchResult.volunteerHours
                        ? searchResult.volunteerHours
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
