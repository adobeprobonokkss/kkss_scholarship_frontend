import { Button } from "@swc-react/button";
import { Picker } from "@swc-react/picker";
import { MenuItem } from "@swc-react/menu";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
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

import { API_HEADERS, API_TIMEOUT } from "./../utils/shared";
import CustomizedRoleSelection from "./PromoteUserDialogue";

import classes from "./../styles/SearchTool.module.css";

interface UserData {
  name: string;
  email: string;
  picture: string;
  role: string;
}

const SearchTool: React.FC = () => {
  const [searchOption, setSearchOption] = useState("email");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<null | string>(null);
  const [isSuccessFullyPromoted, setSuccessFullyPromoted] = useState(false);

  //--------------------Modal Dialogue Code------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRoleSubmit = async (selectedRole: string) => {
    console.log("Selected Role:", selectedRole);
    console.log("Selected Email:", selectedEmail);

    closeModal();
    //promote user .... and get the response .... inform user by showing message
    try {
      const options: AxiosRequestConfig = {
        method: "POST",
        url: `${process.env.REACT_APP_BACK_END_URL}/api/v1/protected/promoteUserRole`,
        headers: API_HEADERS,
        data: {
          email: selectedEmail,
          role: selectedRole,
        },
        timeout: API_TIMEOUT,
        withCredentials: true,
      };
      const response: AxiosResponse = await axios(options);
      setSuccessFullyPromoted(true);
      setTimeout(() => {
        setSuccessFullyPromoted(false);
      }, 5000);
      return response;
    } catch (error) {
      console.error("Error submitting scholarship form data: ", error);
      return null;
    }
  };

  const getAllUsers = async (
    partialText: string,
    keyName: string
  ): Promise<UserData[]> => {
    console.log(partialText, keyName);
    const response: any = await axios
      .post(
        `${process.env.REACT_APP_BACK_END_URL}/api/v1/protected/get/users`,
        { keyName, partialText },
        {
          withCredentials: true,
        }
      )
      .catch((err) => {
        console.log("not authnticated user....");
        // navigate("/");
      });

    if (response && response.data) {
      // setLoading(false);
      const usersList: UserData[] = await response.data;

      // setData(data);
      console.log(response.data);
      return usersList;
    } else {
      return [];
      // setLoading(false);
      // setError(response);
    }
  };

  const handleSearchOptionChange = (event: any) => {
    setSearchOption(event.target.value);
  };

  const handleSearchQueryChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    // console.log("DEBUG", searchQuery);
    if (searchQuery === "") {
      setSearchResults([]);
      return;
    }
    const userData = await getAllUsers(searchQuery, searchOption);
    setSearchResults(Array.isArray(userData) ? userData : []);
  };

  return (
    <>
      {isSuccessFullyPromoted ? <h3>Successfuly Promoted User to Role</h3> : ""}
      <div className={classes["form-search"]}>
        <div className={classes["form-search-area"]}>
          <div className={classes["form-search__search-options"]}>
            <Picker
              value={searchOption}
              change={handleSearchOptionChange}
              placeholder="Select an option"
              style={{ width: "100%" }}
            >
              {/* <MenuItem value="scholarshipID">Scholarship ID</MenuItem> */}
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="phNumber">Phone Number</MenuItem>
              {/* <MenuItem value="name">Applicant Name</MenuItem> */}
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
      <CustomizedRoleSelection
        isOpen={isModalOpen}
        userName={selectedEmail}
        onClose={closeModal}
        onSubmit={handleRoleSubmit}
      />

      <div className={classes["form-search__search-results"]}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email-ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Promotion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults &&
              searchResults.map((searchResult: UserData) => (
                <TableRow key={searchResult.email}>
                  <TableCell style={{ minWidth: "25%" }}>
                    {searchResult.email}
                  </TableCell>
                  <TableCell>{searchResult.name}</TableCell>
                  <TableCell>{"NOT AVAILABLE"}</TableCell>
                  <TableCell>{searchResult.role}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => {
                        setSelectedEmail(searchResult.email);
                        openModal();
                      }}
                    >
                      Promote
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SearchTool;
