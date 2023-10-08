import React from "react";
import {
  ScholarshipData,
  ScholarshipFormKeys,
} from "services/ScholarshipFormService";
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
};

export interface ScholarshipFormContextProps {
  onFormDataChange: (key: ScholarshipFormKeys, value: string) => void;
}
const ScholarshipFormContext = React.createContext<
  ScholarshipData & ScholarshipFormContextProps
>({
  ...initForm,
  onFormDataChange: (key: ScholarshipFormKeys, value: string) => {},
});

const ScholarshipFormProvider: React.FC<any> = (props: any) => {
  const [formData, setFormData] = React.useState(initForm);

  const onFormDataChange = (key: ScholarshipFormKeys, value: string) => {
    console.log("onFormDataChange", key, value);
    setFormData((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => {
      if (document.querySelectorAll("sp-picker"))
        document.querySelectorAll("sp-picker")[0]?.removeAttribute("open");
    }, 500);
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
