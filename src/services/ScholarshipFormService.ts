import { Textfield } from "@swc-react/textfield";
import { Picker } from "@swc-react/picker";
import { createElement } from "react";
import { MenuItem } from "@swc-react/menu";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_HEADERS, API_TIMEOUT, getUsersInfo } from "../utils/shared";
import { user } from "../interface/UserSession";
import {
  ApplicationStatusKeys,
  ApplicationStatusType,
  RoleType,
  ScholarshipApplicationResponse,
} from "../utils/types";
import { ScholarshipFormContextProps } from "context/ScholarshipFormContext";

export type ScholarshipData = {
  email: string;
  name: string;
  aadharNumber: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  address: string;
  phNumber: string;
  motherTongue: string;
  placeOfBirth: string;
  referral: string;
  refferralPhNumber: string;
  schoolCollegeNameAndAddress: string;
  education: string;
  stream: string;
  class: string;
  educationOthers: string;
  mediumOfEducation: string;
  schoolCollegePhNumber: string;
  estimatedAnnualFee: string;
  year1: string;
  year2: string;
  year3: string;
  hobbies: string;
  ambition: string;
  awardDetails: string;
  attendanceDetails: string;
  fatherName: string;
  fatherAge: string;
  fatherOccupation: string;
  fatherAnnualIncome: string;
  fatherPhNumber: string;
  motherName: string;
  motherAge: string;
  motherOccupation: string;
  motherAnnualIncome: string;
  motherPhNumber: string;
  siblingName: string;
  siblingAge: string;
  siblingOccupation: string;
  siblingAnnualIncome: string;
  siblingPhNumber: string;
  scholarshipID?: string;
  status?: ApplicationStatusType;
  submissionYear?: string;
  backgroundVerifierEmail?: string;
  backgroundVerifierName?: string;
  programManagerEmail?: string;
  programManagerName?: string;
  submissionDate?: string;
  programManagerComment1?: string;
  programManagerComment2?: string;
  backgroundVerifierComment?: string;
  adminComment?: string;
  volunteerHours?: string;
};

export type ScholarshipDataRequest = {
  field?: string;
  keyword?: string;
  year?: string;
  status?: string | undefined;
  limit?: number;
};

export type ScholarshipFormKeys = keyof ScholarshipData;

// Statuses
export const scholarshipApplicationStatuses: [string, string][] = [
  ["all", "All"],
  ["submitted", "Submitted"],
  ["initial_review_completed", "Initial Review Completed"],
  ["background_verification_completed", "Background Check Completed"],
  ["final_review_completed", "Final Review Completed"],
  ["approved", "Approved"],
  ["rejected", "Rejected"],
];

export const scholarshipApplicationStatusesMap: Map<string, string> = new Map<
  string,
  string
>(scholarshipApplicationStatuses);

const configs = [
  // Personal Details
  {
    label: "Personal Details",
    key: "personalDetails",
    formFields: [
      // Email
      {
        key: "email",
        label: "Email",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter valid Email",
          id: "email",
          value: "",
          required: true,
          type: "email",
          pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
        },
      },
      // Name
      {
        key: "name",
        label: "Name",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Name as per Bank Account",
          id: "name",
          value: "",
          required: true,
          pattern: "[a-zA-Z ]{1,64}",
        },
      },
      // Aadhar Number
      {
        key: "aadharNumber",
        label: "Aadhar Number",
        type: "text",
        component: Textfield,
        props: {
          type: "number",
          placeholder: "Enter Aadhar Number",
          id: "aadharNumber",
          value: "",
          required: true,
          pattern: "[0-9]{12}",
        },
      },
      // Date of Birth
      {
        key: "dateOfBirth",
        label: "Date of Birth",
        type: "date",
        props: {
          id: "dateOfBirth",
        },
      },
      // Gender
      {
        key: "gender",
        label: "Gender",
        component: Picker,
        type: "dropdown",
        props: {
          label: "Select Gender",
          id: "gender",
          value: "",
        },
      },
      // Category
      {
        key: "category",
        label: "Category",
        component: Picker,
        type: "dropdown",
        props: {
          label: "Choose Category",
          id: "category",
          value: "",
        },
      },
      // Address
      {
        key: "address",
        label: "Address",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Address",
          id: "address",
          value: "",
          multiline: true,
          grows: true,
          required: true,
          pattern: "[a-zA-Z0-9,.\\- ]{1,300}",
        },
      },
      // Phone Number
      {
        key: "phNumber",
        label: "Phone Number",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Phone Number ",
          id: "phNumber",
          value: "",
          required: true,
          pattern: "[0-9]{10}",
        },
      },
      // Mother Tongue
      {
        key: "motherTongue",
        label: "Mother Tongue",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Mother Tongue",
          id: "motherTongue",
          value: "",
          required: true,
          pattern: "[a-zA-Z ]{1,24}",
        },
      },
      // Place of Birth
      {
        key: "placeOfBirth",
        label: "Place of Birth",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Place of Birth",
          id: "placeOfBirth",
          value: "",
          required: true,
          pattern: "[a-zA-Z ]{1,80}",
        },
      },
      // Referred By
      {
        key: "referral",
        label: "Referred by",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter name of the person Referred",
          id: "referral",
          value: "",
          required: true,
          pattern: "[a-zA-Z ]{1,64}",
        },
      },
      // Contact Number of the Person Referred
      {
        key: "refferralPhNumber",
        label: "Contact number of the person Referred",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter contact number of the person Referred ",
          id: "",
          value: "",
          required: true,
          pattern: "[0-9]{10}",
        },
      },
    ],
  },
  // Education Details
  {
    label: "Education Details",
    key: "educationDetails",
    formFields: [
      // School/College Name and Address
      {
        key: "schoolCollegeNameAndAddress",
        label: "School/College Name and Address",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter School/College Name and Address",
          id: "schoolCollegeNameAndAddress",
          value: "",
          required: true,
          multiline: true,
          grows: true,
          pattern: "[a-zA-Z0-9,.\\- ]{1,300}",
        },
      },
      // Education
      {
        key: "education",
        label: "Education",
        component: Picker,
        type: "dropdown",
        props: {
          label: "Choose Education",
          id: "education",
          value: "",
          required: true,
        },
      },
      // Stream
      {
        key: "stream",
        label: "Stream",
        type: "dropdown",
        component: Picker,
        displayField: (formDataCtx: any) => {
          const id = formDataCtx.education;
          return (
            id.length > 0 &&
            id != "others" &&
            Object.keys(streamMap).includes(id)
          );
        },
        props: {
          label: "Select stream",
          id: "stream",
          value: "",
        },
      },
      // Class
      {
        key: "class",
        label: "Class",
        type: "dropdown",
        component: Picker,
        displayField: (formDataCtx: any) => {
          const id = formDataCtx.education;
          return id.length > 0;
        },
        props: {
          label: "Select class",
          id: "class",
          value: "",
        },
      },
      // Others
      {
        key: "educationOthers",
        label: "Others",
        type: "text",
        component: Textfield,
        displayField: (formDataCtx: any) => {
          return (
            formDataCtx.education == "others" || formDataCtx.stream == "others"
          );
        },
        props: {
          placeholder: "Enter details",
          id: "educationOthers",
          value: "",
          pattern: "[a-zA-Z, ]{1,100}",
        },
      },
      // Medium of Education
      {
        key: "mediumOfEducation",
        label: "Medium of Education",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Medium of Education",
          id: "mediumOfEducation",
          value: "",
          required: true,
          pattern: "[a-zA-Z ]{1,24}",
        },
      },
      // School/College Phone Number
      {
        key: "schoolCollegePhNumber",
        label: "School/College Phone Number",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter School/College Phone Number",
          id: "schoolCollegePhNumber",
          value: "",
          required: true,
          pattern: "[0-9]{10}",
        },
      },
      // Estimated Annual Fee
      {
        key: "estimatedAnnualFee",
        label: "Estimated Annual Fee",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Estimated Annual Fee",
          id: "estimatedAnnualFee",
          value: "",
          required: true,
          pattern: "[0-9]{1,16}",
        },
      },
      // Previous 3 year marks
      {
        key: "3yearMarks",
        label: "Previous 3 year marks",
        component: Textfield,
        props: {
          value: "Previous 3 year marks",
          pattern: "[0-9]{1,16}",
        },
      },
      // Year 1
      {
        key: "year1",
        label: `${new Date().getFullYear() - 1}`,
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter marks",
          id: "year1",
          value: "",
          pattern: "[0-9]{1,16}",
        },
      },
      // Year 2
      {
        key: "year2",
        label: `${new Date().getFullYear() - 2}`,
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter marks",
          id: "year2",
          value: "",
          pattern: "[0-9]{1,16}",
        },
      },
      // Year 3
      {
        key: "year3",
        label: `${new Date().getFullYear() - 3}`,
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter marks",
          id: "year3",
          value: "",
          pattern: "[0-9]{1,16}",
        },
      },
      // Hobbies
      {
        key: "hobbies",
        label: "Hobbies",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Hobbies",
          id: "hobbies",
          value: "",
          required: true,
          pattern: "[a-zA-Z0-9,. ]{1,1000}",
          multiline: true,
          grows: true,
        },
      },
      // Ambition
      {
        key: "ambition",
        label: "Ambition",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Ambition",
          id: "ambition",
          value: "",
          required: true,
          multiline: true,
          grows: true,
          pattern: "[a-zA-Z0-9,. ]{1,3000}",
        },
      },
      // Academic Year Award Details
      {
        key: "awardDetails",
        label: "Academic Year Award Details",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Academic Year Award Details",
          id: "awardDetails",
          value: "",
          pattern: "[a-zA-Z0-9,. ]{1,3000}",
          multiline: true,
          grows: true,
        },
      },
      // Attendance Details for Previous Year
      {
        key: "attendanceDetails",
        label: "Attendance Details for Previous Year",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Attendance Details for Previous Year",
          id: "attendanceDetails",
          value: "",
          pattern: "[a-zA-Z0-9,. ]{1,100}",
        },
      },
    ],
  },
  // Family Details
  {
    label: "Family Details",
    key: "familyDetails",
    formFields: [
      // Father's Name
      {
        key: "fatherName",
        label: "Father's Name",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Father's Name",
          id: "fatherName",
          value: "",
          pattern: "[a-zA-Z ]{1,64}",
        },
      },
      // Father's Age
      {
        key: "fatherAge",
        label: "Father's Age",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Father's Age",
          id: "fatherAge",
          value: "",
          pattern: "[0-9]{1,3}",
        },
      },
      // Father's Occupation
      {
        key: "fatherOccupation",
        label: "Father's Occupation",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Father's Occupation",
          id: "fatherOccupation",
          value: "",
          pattern: "[a-zA-Z ]{1,64}",
        },
      },
      // Father's Annual Income
      {
        key: "fatherAnnualIncome",
        label: "Father's Annual Income",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Father's Annual Income",
          id: "fatherAnnualIncome",
          value: "",
          required: true,
          pattern: "[0-9]{1,32}",
        },
      },
      // Father's Mobile Number
      {
        key: "fatherPhNumber",
        label: "Father's Mobile Number",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Father's Mobile Number ",
          id: "fatherPhNumber",
          value: "",
          required: true,
          pattern: "[0-9]{10}",
        },
      },
      // Mother's Name
      {
        key: "motherName",
        label: "Mother's Name",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Mother's Name",
          id: "motherName",
          value: "",
          pattern: "[a-zA-Z ]{1,64}",
        },
      },
      // Mother's Age
      {
        key: "motherAge",
        label: "Mother's Age",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Mother's Age",
          id: "motherAge",
          value: "",
          pattern: "[0-9]{1,3}",
        },
      },
      // Mother's Occupation
      {
        key: "motherOccupation",
        label: "Mother's Occupation",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Mother's Occupation",
          id: "motherOccupation",
          value: "",
          pattern: "[a-zA-Z ]{1,64}",
        },
      },
      // Mother's Annual Income
      {
        key: "motherAnnualIncome",
        label: "Mother's Annual Income",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Mother's Annual Income",
          id: "motherAnnualIncome",
          value: "",
          required: true,
          pattern: "[0-9]{1,32}",
        },
      },
      // Mother's Mobile Number
      {
        key: "motherPhNumber",
        label: "Mother's Mobile Number",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Mother's Mobile Number ",
          id: "motherPhNumber",
          value: "",
          required: true,
          pattern: "[0-9]{10}",
        },
      },
      // Sibling's Name
      {
        key: "siblingName",
        label: "Sibling's Name",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Sibling's Name",
          id: "siblingName",
          value: "",
          pattern: "[a-zA-Z ]{1,64}",
        },
      },
      //  Sibling's Age
      {
        key: "siblingAge",
        label: "Sibling's Age",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Sibling's Age",
          id: "siblingAge",
          value: "",
          pattern: "[0-9]{1,3}",
        },
      },
      // Sibling's Occupation
      {
        key: "siblingOccupation",
        label: "Sibling's Occupation",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Sibling's Occupation",
          id: "siblingOccupation",
          value: "",
          pattern: "[a-zA-Z ]{1,64}",
        },
      },
      // Sibling's Annual Income
      {
        key: "siblingAnnualIncome",
        label: "Sibling's Annual Income",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Sibling's Annual Income",
          id: "siblingAnnualIncome",
          value: "",
          pattern: "[0-9]{1,32}",
        },
      },
      // Sibling's Mobile Number
      {
        key: "siblingPhNumber",
        label: "Sibling's Mobile Number",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Sibling's Mobile Number ",
          id: "siblingPhNumber",
          value: "",
          pattern: "[0-9]{10}",
        },
      },
    ],
  },
];

const streamMap: any = {
  diploma: {
    ene: "Electrical & Electronics",
    entc: "Electronics & Communication",
    cse: "Computer Science",
    me: "Mechanical",
    auto: "Automobile",
    others: "Others",
  },
  graduation: {
    science: "Science",
    commerce: "Commerce",
    arts: "Arts",
    engineering: "Engineering",
    arch: "Architecture",
    medical: "Medical",
    law: "Law",
    jounalism: "Jounalism",
    others: "Others",
  },
  postGraduation: {
    science: "Science MSC",
    commerce: "Commerce Mcom, CA",
    arts: "Arts MA",
    engineering: "Engineering MTech",
    arch: "Architecture MArch",
    medical: "Medical MD, MS, etc",
    law: "Law LLM",
    jounalism: "Jounalism",
    others: "Others",
  },
};

const classMap: any = {
  primary: {
    "1stStandard": "1st Standard",
    "2ndStandard": "2nd Standard",
    "3rdStandard": "3rd Standard",
    "4thStandard": "4th Standard",
    "5thStandard": "5th Standard",
    "6thStandard": "6th Standard",
    "7thStandard": "7th Standard",
  },
  highSchool: {
    "8thStandard": "8th Standard",
    "9thStandard": "9th Standard",
    "10thStandard": "10th Standard",
  },
  puCollege: {
    "1stPUCScience": "1st PUC Science",
    "1stPUCCommerce": "1st PUC Commerce",
    "1stPUCArts": "1st PUC Arts",
    "2ndPUCScience": "2nd PUC Science",
    "2ndPUCCommerce": "2nd PUC Commerce",
    "2ndPUCArts": "2nd PUC Arts",
  },
  diploma: {
    "1stYear": "1st Year",
    "2ndYear": "2nd Year",
    "3rdYear": "3rd Year",
    "4thYear": "4th Year",
    "5thYear": "5th Year",
  },
  graduation: {
    "1stYear": "1st Year",
    "2ndYear": "2nd Year",
    "3rdYear": "3rd Year",
    "4thYear": "4th Year",
    "5thYear": "5th Year",
  },
  postGraduation: {
    "1stYear": "1st Year",
    "2ndYear": "2nd Year",
    "3rdYear": "3rd Year",
    "4thYear": "4th Year",
    "5thYear": "5th Year",
  },
};

const educationLevels: any = {
  primary: "Primary",
  highSchool: "High School",
  puCollege: "PU College",
  diploma: "Diploma",
  graduation: "Graduation",
  postGraduation: "Post Graduation",
  others: "Others",
};

const genders = {
  male: "Male",
  female: "Female",
};

const category = {
  sc: "SC",
  st: "ST",
  obc: "OBC",
  ews: "EWS",
  general: "General",
};

export const validationMap: any = {
  email: {
    maxLength: 128,
  },
  name: {
    maxLength: 64,
  },
  aadharNumber: {
    maxLength: 12,
  },
  dateOfBirth: {},
  gender: {},
  category: {},
  address: {
    maxLength: 300,
  },
  phNumber: {
    maxLength: 13,
  },
  motherTongue: {
    maxLength: 24,
  },
  placeOfBirth: {
    maxLength: 80,
  },
  referral: {
    maxLength: 64,
  },
  refferralPhNumber: {
    maxLength: 13,
  },
  schoolCollegeNameAndAddress: {
    maxLength: 300,
  },
  education: {},
  stream: {},
  class: {},
  educationOthers: {
    maxLength: 100,
  },
  mediumOfEducation: {
    maxLength: 24,
  },
  schoolCollegePhNumber: {
    maxLength: 10,
  },
  estimatedAnnualFee: {
    maxLength: 16,
  },
  year1: {
    maxLength: 16,
  },
  year2: {
    maxLength: 16,
  },
  year3: {
    maxLength: 16,
  },
  hobbies: {
    maxLength: 1000,
  },
  ambition: {
    maxLength: 3000,
  },
  awardDetails: {
    maxLength: 3000,
  },
  attendanceDetails: {
    maxLength: 100,
  },
  fatherName: {
    maxLength: 64,
  },
  fatherAge: {
    maxLength: 3,
  },
  fatherOccupation: {
    maxLength: 64,
  },
  fatherAnnualIncome: {
    maxLength: 32,
  },
  fatherPhNumber: {
    maxLength: 13,
  },
  motherName: {
    maxLength: 64,
  },
  motherAge: {
    maxLength: 3,
  },
  motherOccupation: {
    maxLength: 64,
  },
  motherAnnualIncome: {
    maxLength: 32,
  },
  motherPhNumber: {
    maxLength: 13,
  },
  siblingName: {
    maxLength: 64,
  },
  siblingAge: {
    maxLength: 3,
  },
  siblingOccupation: {
    maxLength: 64,
  },
  siblingAnnualIncome: {
    maxLength: 32,
  },
  siblingPhNumber: {
    maxLength: 13,
  },
};

export const validateForm = (formData: ScholarshipData) => {
  const errors: string[] = [];
  configs.forEach((config) => {
    config.formFields.forEach((field: any) => {
      if (field.key in validationMap) {
        const fieldVal = formData[field.key as ScholarshipFormKeys] ?? "";
        const pattern = field.props.pattern;
        console.log(
          fieldVal,
          pattern,
          new RegExp(pattern),
          fieldVal && new RegExp(pattern).test(fieldVal)
        );
        if (field.props.required && fieldVal?.length == 0) {
          errors.push(`${field.label} is required`);
        }
        if (
          fieldVal.length > 0 &&
          pattern &&
          !new RegExp(pattern).test(fieldVal)
        ) {
          errors.push(
            `Invalid ${field.label}. Please enter valid ${field.label}`
          );
        }
        if (fieldVal?.length > validationMap[field.key].maxLength) {
          errors.push(
            `Max length exceeded. Max length for ${field.label} is ${
              validationMap[field.key].maxLength
            }`
          );
        }
      }
    });
  });

  return errors;
};

export const renderMenuItem = (item: any) => {
  return createElement(MenuItem, {
    value: item.key,
    children: item.value,
    key: item.key,
  });
};

export const renderPickerChildren = (
  fieldID: string,
  formDataCtx: ScholarshipData
) => {
  let children: any;
  switch (fieldID) {
    case "stream": {
      const streamID = formDataCtx.education;
      if (streamID == "others") return null;
      children = streamMap[streamID];
      break;
    }
    case "class": {
      const classID = formDataCtx.education;
      if (classID == "others") return null;
      children = classMap[classID];
      break;
    }
    case "education": {
      children = educationLevels;
      break;
    }
    case "gender": {
      children = genders;
      break;
    }
    case "category": {
      children = category;
      break;
    }
  }
  console.log(fieldID, children);
  return Object.keys(children).map((el: string) =>
    renderMenuItem({ key: el, value: children[el] })
  );
};

// submit scholarship form
export const submitApplication = async (
  scholarshipFormData: ScholarshipData
) => {
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.REACT_APP_BACK_END_URL}/api/v1/submitApplication`,
      headers: API_HEADERS,
      data: {
        scholarshipFormData,
      },
      timeout: API_TIMEOUT,
      withCredentials: true,
    };
    const response: AxiosResponse = await axios(options);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error submitting scholarship form data: ", error);
    return null;
  }
};

// get scholarship form data by scholarship ID
export const getScholarshipFormData = async (
  request: ScholarshipDataRequest
) => {
  // token check
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.REACT_APP_BACK_END_URL}/api/v1/getScholarshipFormData`,
    headers: API_HEADERS,
    data: request,
    timeout: API_TIMEOUT,
    withCredentials: true,
  };
  try {
    const response: AxiosResponse = await axios(options);
    console.log(response);
    return response?.data?.scholarshipFormData;
  } catch (error) {
    console.error("Error getting scholarship form data: ", error);
    return null;
  }
};

export const getAllScholarshipFormData = async () => {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `${process.env.REACT_APP_BACK_END_URL}/api/v1/getAllScholarshipFormData`,
      headers: API_HEADERS,
      timeout: API_TIMEOUT,
      withCredentials: true,
    };
    const response: AxiosResponse = await axios(options);
    console.log(response);
    return response?.data?.scholarshipFormData;
  } catch (error) {
    console.error("Error getting scholarship form data: ", error);
    return null;
  }
};

export const updateStatusAndFormDetails = async (
  userInfo: user | null,
  scholarshipApplication: ScholarshipData
): Promise<void | AxiosResponse<
  ScholarshipApplicationResponse,
  any
> | null> => {
  if (!userInfo) return;
  if (!scholarshipApplication) return;
  const isReviewer = userInfo?.role == RoleType.REVIEWER;
  const isAdmin = userInfo?.role == RoleType.ADMIN;
  const isPM = userInfo?.role == RoleType.PROGRAM_MANAGER;
  switch (scholarshipApplication.status) {
    case "submitted": {
      if (isAdmin || isPM) {
        scholarshipApplication.status =
          ApplicationStatusKeys.initial_review_completed;
      }
      break;
    }
    case "initial_review_completed": {
      if (isAdmin || isPM || isReviewer) {
        scholarshipApplication.status =
          ApplicationStatusKeys.background_verification_completed;
        break;
      }
    }
    case "background_verification_completed": {
      if (isAdmin || isPM) {
        scholarshipApplication.status =
          ApplicationStatusKeys.final_review_completed;
        break;
      }
    }
  }
  console.log("In reviewApplication", scholarshipApplication);
  return await reviewApplication(userInfo?.email, scholarshipApplication);
};

export const reviewApplication = async (
  email: string | undefined | null,
  scholarshipFormData: ScholarshipData
) => {
  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${process.env.REACT_APP_BACK_END_URL}/api/v1/reviewApplication`,
      headers: API_HEADERS,
      data: {
        email,
        scholarshipFormData,
      },
      timeout: API_TIMEOUT,
      withCredentials: true,
    };
    const response: AxiosResponse = await axios(options);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error reviewing scholarship form data: ", error);
    return null;
  }
};

export const validateReviewProcess = (
  formCtx: ScholarshipData & ScholarshipFormContextProps
) => {
  const errors: string[] = [];
  if (formCtx.status == ApplicationStatusKeys.submitted) {
    if (!formCtx.programManagerName || formCtx.programManagerName.length == 0) {
      errors.push("Program Manager Name is required");
    }
    if (
      !formCtx.programManagerEmail ||
      formCtx.programManagerEmail.length == 0
    ) {
      errors.push("Program Manager Email is required");
    }
    if (
      !formCtx.programManagerComment1 ||
      formCtx.programManagerComment1.length == 0
    ) {
      errors.push("Program Manager Comment is required");
    }
    if (
      !formCtx.backgroundVerifierName ||
      formCtx.backgroundVerifierName.length == 0
    ) {
      errors.push("Background Verifier Name is required");
    }
    if (
      !formCtx.backgroundVerifierEmail ||
      formCtx.backgroundVerifierEmail.length == 0
    ) {
      errors.push("Background Verifier Email is required");
    }
  } else if (formCtx.status == ApplicationStatusKeys.initial_review_completed) {
    if (
      !formCtx.backgroundVerifierComment ||
      formCtx.backgroundVerifierComment.length == 0
    ) {
      errors.push("Background Verifier Comment is required");
    }
  } else if (
    formCtx.status == ApplicationStatusKeys.background_verification_completed
  ) {
    if (
      !formCtx.programManagerComment2 ||
      formCtx.programManagerComment2.length == 0
    ) {
      errors.push("Program Manager Comment is required");
    }
  } else if (formCtx.status == ApplicationStatusKeys.final_review_completed) {
    if (!formCtx.adminComment || formCtx.adminComment.length == 0) {
      errors.push("Admin Comment is required");
    }
  } else if (
    formCtx.status == ApplicationStatusKeys.approved ||
    formCtx.status == ApplicationStatusKeys.rejected
  ) {
    if (getUsersInfo()?.decoded?.role != RoleType.ADMIN) {
      errors.push("Only Admin can approve or reject");
    }
  }
  return errors;
};

export default configs;
