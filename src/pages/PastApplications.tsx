import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@swc-react/table";
import { Link } from "@swc-react/link";
import React from "react";

import classes from "../styles/FormSearch.module.css";
import {
  ScholarshipData,
  ScholarshipDataRequest,
  getScholarshipFormData,
  scholarshipApplicationStatusesMap,
} from "../services/ScholarshipFormService";
import { useNavigate } from "react-router-dom";
import { getUsersInfo } from "../utils/shared";

const PastApplications: React.FC = () => {
  const [searchResults, setSearchResults] = React.useState<ScholarshipData[]>(
    []
  );
  const userInfo = getUsersInfo().decoded;
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchScholarshipApplications();
  }, []);

  const fetchScholarshipApplications = async () => {
    let scholarshipData: ScholarshipData[] = [];
    const request: ScholarshipDataRequest = {
      field: "email",
      keyword: userInfo?.email ?? "",
    };
    scholarshipData = (await getScholarshipFormData(request)) ?? [];
    setSearchResults(
      Array.isArray(scholarshipData) ? scholarshipData : [scholarshipData]
    );
  };

  return (
    <>
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

export default PastApplications;
