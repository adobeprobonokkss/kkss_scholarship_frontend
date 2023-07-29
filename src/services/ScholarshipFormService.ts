import { Textfield } from "@swc-react/textfield";
import { Picker } from "@swc-react/picker";

export type ScholarshipData = {
  name: string;
  aadharNumber: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  address: string;
  phoneNumber: string;
  motherTongue: string;
  placeOfBirth: string;
  referredBy: string;
  contactNumberOfThePersonReferred: string;
  schoolCollegeNameAndAddress: string;
  education: string;
  class: string;
  mediumOfEducation: string;
  schoolCollegePhoneNumber: string;
  estimatedAnnualFee: string;
  previous3YearMarks: string;
  hobbies: string;
  ambition: string;
  academicYearAwardDetails: string;
  attendanceDetailsForPreviousYear: string;
  fathersName: string;
  fathersAge: string;
  fathersOccupation: string;
  fathersAnnualIncome: string;
  fathersMobileNumber: string;
  mothersName: string;
  mothersAge: string;
  mothersOccupation: string;
  mothersAnnualIncome: string;
  mothersMobileNumber: string;
  siblingsName: string;
  siblingsAge: string;
  siblingsOccupation: string;
  siblingsAnnualIncome: string;
  siblingsMobileNumber: string;
  yourNameAsInBankPassBook: string;
  bankName: string;
  bankIFSCCode: string;
  bankAccountNumber: string;
};

const configs = [
  {
    label: "Personal Details",
    key: "personalDetails",
    formFields: [
      {
        key: "name",
        label: "Name",
        type: "text",
        component: Textfield,
        props: {
          label: "Enter your name",
          id: "name",
          value: "",
          change: (e: Event) => {
            console.log("named changed");
          },
        },
      },
      {
        key: "year",
        label: "Year",
        component: Picker,
        type: "dropdown",
        props: {
          label: "Enter your Year",
          id: "Year",
          value: "",
          change: (e: Event) => {
            console.log("Year changed");
          },
          children: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
        },
      },
    ],
  },
  {
    label: "Other Details",
    key: "otherDetails",
    formFields: [
      {
        key: "name",
        label: "Name",
        type: "text",
        component: Textfield,
        props: {
          label: "Enter your name",
          id: "name",
          value: "",
          change: (e: Event) => {
            console.log("named changed");
          },
          style: {
            width: "400px",
            height: "100px",
          },
        },
      },
      {
        key: "year",
        label: "Year",
        component: Picker,
        type: "dropdown",
        props: {
          label: "Enter your Year",
          id: "Year",
          value: "",
          change: (e: Event) => {
            console.log("Year changed");
          },
          children: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
        },
      },
    ],
  },
  {
    label: "School Details",
    key: "schoolDetails",
    formFields: [
      {
        key: "name",
        label: "Name",
        type: "text",
        component: Textfield,
        props: {
          label: "Enter your name",
          id: "name",
          value: "",
          change: (e: Event) => {
            console.log("named changed");
          },
          style: {
            width: "400px",
            height: "100px",
          },
        },
      },
      {
        key: "year",
        label: "Year",
        component: Picker,
        type: "dropdown",
        props: {
          label: "Enter your Year",
          id: "Year",
          value: "",
          change: (e: Event) => {
            console.log("Year changed");
          },
          children: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
        },
      },
    ],
  },
];

export default configs;
