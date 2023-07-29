import { Textfield } from "@swc-react/textfield";
import { Picker } from "@swc-react/picker";

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
  class: string;
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
  fathersName: string;
  fathersAge: string;
  fathersOccupation: string;
  fathersAnnualIncome: string;
  fatherPhNumber: string;
  mothersName: string;
  mothersAge: string;
  mothersOccupation: string;
  mothersAnnualIncome: string;
  motherPhNumber: string;
  siblingName: string;
  siblingAge: string;
  siblingOccupation: string;
  siblingAnnualIncome: string;
  siblingPhNumber: string;
  formSubmittedBy: string;
  yourPhNumber: string;
};

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
          placeholder: "Valid Email",
          id: "email",
          value: "",
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
        },
      },
      // Aadhar Number
      {
        key: "aadharNumber",
        label: "Aadhar Number",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Aadhar Number",
          id: "aadharNumber",
          value: "",
        },
      },
      // Date of Birth
      {
        key: "dateOfBirth",
        label: "Date of Birth",
        type: "text",
        component: Textfield,
        props: {
          id: "dateOfBirth",
          value: "",
        },
      },
      // Gender
      {
        key: "gender",
        label: "Gender",
        component: Picker,
        type: "dropdown",
        props: {
          placeholder: "Select Gender",
          id: "gender",
          value: "",
          children: ["Male", "Female"],
        },
      },
      // Category
      {
        key: "category",
        label: "Category",
        component: Picker,
        type: "dropdown",
        props: {
          placeholder: "Choose Category",
          id: "category",
          value: "",
          children: ["SC", "ST", "OBC", "EWS", "General"],
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
        },
      },
      // Phone Number
      {
        key: "phNumber",
        label: "Phone Number",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Phone Number",
          id: "phNumber",
          value: "",
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
        },
      },
      // Contact Number of the Person Referred
      {
        key: "refferralPhNumber",
        label: "Contact number of the person Referred",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter contact number of the person Referred",
          id: "",
          value: "",
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
        },
      },
      // Education
      {
        key: "education",
        label: "Education",
        component: Picker,
        type: "dropdown",
        props: {
          placeholder: "Enter Education",
          id: "education",
          value: "",
          children: [
            "Primary",
            "High School",
            "PU College",
            "Diploma",
            "Graduation",
            "Post Graduation",
            "Others",
          ],
        },
      },
      // Class
      {
        key: "class",
        label: "Class",
        type: "text",
        component: Picker,
        props: {
          placeholder: "Select class",
          id: "class",
          value: "",
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
        },
      },
      // Previous 3 year marks
      {
        key: "3yearMarks",
        label: "Previous 3 year marks",
        component: Textfield,
        props: {
          value: "Previous 3 year marks",
        },
      },
      // Year 1
      {
        key: "year1",
        label: `${(new Date().getFullYear() - 1).toString()}`,
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter marks",
          id: "year1",
          value: "",
        },
      },
      // Year 2
      {
        key: "year2",
        label: `${(new Date().getFullYear() - 2).toString()}`,
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter marks",
          id: "year2",
          value: "",
        },
      },
      // Year 3
      {
        key: "year3",
        label: `${(new Date().getFullYear() - 3).toString()}`,
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter marks",
          id: "year3",
          value: "",
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
        },
      },
      // Father's Mobile Number
      {
        key: "fatherPhNumber",
        label: "Father's Mobile Number",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Father's Mobile Number",
          id: "fatherPhNumber",
          value: "",
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
        },
      },
      // Mother's Mobile Number
      {
        key: "motherPhNumber",
        label: "Mother's Mobile Number",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Mother's Mobile Number",
          id: "motherPhNumber",
          value: "",
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
        },
      },
      // Sibling's Mobile Number
      {
        key: "siblingPhNumber",
        label: "Sibling's Mobile Number",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Sibling's Mobile Number",
          id: "siblingPhNumber",
          value: "",
        },
      },
      // Form Submitted by
      {
        key: "formSubmittedBy",
        label: "Form Submitted by",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Form Submitted by",
          id: "formSubmittedBy",
          value: "",
        },
      },
      // Your Phone no.
      {
        key: "yourPhNumber",
        label: "Your Phone no.",
        type: "text",
        component: Textfield,
        props: {
          placeholder: "Enter Your Phone no.",
          id: "yourPhNumber",
          value: "",
        },
      },
    ],
  },
];

export default configs;
