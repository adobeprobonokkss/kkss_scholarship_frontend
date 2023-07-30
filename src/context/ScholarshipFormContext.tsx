import React from "react";
import { ScholarshipData } from "services/ScholarshipFormService";
import { formatDate } from "../utils/shared";

const initForm: ScholarshipData = {
  email: "",
  name: "",
  aadharNumber: "",
  dateOfBirth: formatDate(new Date()),
  gender: "",
  category: "",
  address: "",
  phNumber: "",
  motherTongue: "",
  placeOfBirth: "",
  referral: "",
  refferralPhNumber: "",
  schoolCollegeNameAndAddress: "",
  education: "",
  stream: "",
  class: "",
  educationOthers: "",
  mediumOfEducation: "",
  schoolCollegePhNumber: "",
  estimatedAnnualFee: "",
  year1: "",
  year2: "",
  year3: "",
  hobbies: "",
  ambition: "",
  awardDetails: "",
  attendanceDetails: "",
  fatherName: "",
  fatherAge: "",
  fatherOccupation: "",
  fatherAnnualIncome: "",
  fatherPhNumber: "",
  motherName: "",
  motherAge: "",
  motherOccupation: "",
  motherAnnualIncome: "",
  motherPhNumber: "",
  siblingName: "",
  siblingAge: "",
  siblingOccupation: "",
  siblingAnnualIncome: "",
  siblingPhNumber: "",
  formSubmittedBy: "",
  yourPhNumber: "",
};

const ScholarshipFormContext = React.createContext<
  ScholarshipData & { onFormDataChange: (key: any, value: any) => void }
>({
  ...initForm,
  onFormDataChange: (key: any, value: any) => {},
});

const ScholarshipFormProvider: React.FC<any> = (props: any) => {
  const [formData, setFormData] = React.useState(initForm);

  const onFormDataChange = (key: any, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  console.log("In ScholarshipFormProvider.tsx");

  return (
    <ScholarshipFormContext.Provider
      value={{ ...formData, onFormDataChange }}
      {...props}
    >
      {props.children}
    </ScholarshipFormContext.Provider>
  );
};

export { ScholarshipFormContext, ScholarshipFormProvider };
