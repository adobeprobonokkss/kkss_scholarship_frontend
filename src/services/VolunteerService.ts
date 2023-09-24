import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_HEADERS, API_TIMEOUT } from "../utils/shared";

// Submit Volunteering Hours
export const submitVolunteeringHours = async (volunteeringDetails: any) => {
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.REACT_APP_BACK_END_URL}/api/v1/submitVolunteeringHours`,
      headers: API_HEADERS,
      data: {
        volunteeringDetails,
      },
      timeout: API_TIMEOUT,
      withCredentials: true,
    };
    const response: AxiosResponse = await axios(options);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error submitting volunteering hours: ", error);
    return null;
  }
};

// Get Volunteering Hours
export const getVolunteeringHours = async (
  scholarshipID: string,
  email: string
) => {
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.REACT_APP_BACK_END_URL}/api/v1/getVolunteeringHours`,
      headers: API_HEADERS,
      data: {
        scholarshipID,
        email,
      },
      timeout: API_TIMEOUT,
      withCredentials: true,
    };
    const response: AxiosResponse = await axios(options);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error getting volunteering hours: ", error);
    return null;
  }
};

// Get All Volunteering Activity Hours By User
export const getAllVolunteeringActivityHoursByUser = async (
  scholarshipID: string,
  email: string
) => {
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.REACT_APP_BACK_END_URL}/api/v1/getAllVolunteeringActivityHoursByUser`,
      headers: API_HEADERS,
      data: {
        scholarshipID,
        email,
      },
      timeout: API_TIMEOUT,
      withCredentials: true,
    };
    const response: AxiosResponse = await axios(options);
    console.log(response);
    return response;
  } catch (error) {
    console.error(
      "Error getting all volunteering activity hours by user: ",
      error
    );
    return null;
  }
};

// Get Volunteer Activity Hours By Request ID
export const getVolunteerActivityHours = async (requestID: string) => {
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.REACT_APP_BACK_END_URL}/api/v1/getVolunteerActivityHoursByRequestID`,
      headers: API_HEADERS,
      data: {
        requestID,
      },
      timeout: API_TIMEOUT,
      withCredentials: true,
    };
    const response: AxiosResponse = await axios(options);
    console.log(response);
    return response;
  } catch (error) {
    console.error(
      "Error getting volunteer activity hours by request ID: ",
      error
    );
    return null;
  }
};

// Get All Volunteer Activity Hours
export const getAllVolunteerActivityHours = async (limit: number = 50) => {
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.REACT_APP_BACK_END_URL}/api/v1/getAllVolunteerActivityHours`,
      headers: API_HEADERS,
      timeout: API_TIMEOUT,
      withCredentials: true,
      data: {
        limit,
      },
    };
    const response: AxiosResponse = await axios(options);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error getting all volunteer activity hours: ", error);
    return null;
  }
};

// Approve Volunteering Hours
export const approveOrRejectVolunteeringHours = async (
  requestID: string,
  scholarshipID: string,
  decision: string,
  email: string
) => {
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.REACT_APP_BACK_END_URL}/api/v1/approveOrRejectVolunteeringHours`,
      headers: API_HEADERS,
      data: {
        requestID,
        scholarshipID,
        email,
        decision,
      },
      timeout: API_TIMEOUT,
      withCredentials: true,
    };
    const response: AxiosResponse = await axios(options);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error approving volunteering hours: ", error);
    return null;
  }
};

// get volunteering hours by scholarship ID List
export const getVolunteerHoursByScholarshipIDList = async (
  scholarshipIDList: string[]
) => {
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.REACT_APP_BACK_END_URL}/api/v1/getVolunteerHoursByScholarshipIDList`,
      headers: API_HEADERS,
      data: {
        scholarshipIDList,
      },
      timeout: API_TIMEOUT,
      withCredentials: true,
    };
    const response: AxiosResponse = await axios(options);
    console.log(response);
    return response;
  } catch (error) {
    console.error(
      "Error getting volunteering hours by scholarship ID list: ",
      error
    );
    return null;
  }
};
