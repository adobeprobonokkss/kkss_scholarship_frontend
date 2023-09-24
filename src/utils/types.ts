export enum RoleType {
  ADMIN = "ADMIN",
  USER = "USER",
  REVIEWER = "REVIEWER",
  PROGRAM_MANAGER = "PROGRAM_MANAGER",
}

export type ScholarshipApplicationResponse = {
  scholarshipID: string;
  status: string;
  message: string;
};

export type VolunteeringDetails = {
  activityDate?: string;
  noOfHours?: string;
  activityDescription?: string;
  scholarshipID?: string;
};

export type PastVolunteeringDetails = {
  activityDate: string;
  activityDescription: string;
  email: string;
  name: string;
  noOfHours: string;
  requestID: string;
  scholarshipID: string;
  status: string;
  submissionDate: string;
};

export type VolunteerRecordDetails = {
  approvedHours: string;
  email: string;
  name: string;
  scholarshipID: string;
};

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
  formSubmittedBy: string;
  yourPhNumber: string;
  scholarshipID?: string;
  status?: string;
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
};

export enum ApplicationStatus {
  submitted = "Submitted",
  initial_review_completed = "Initial Review Completed",
  background_verification_completed = "Background Check Completed",
  final_review_completed = "Final Review Completed",
  approved = "Approved",
  rejected = "Rejected",
  // infoRequired = "INFO REQUIRED",
}

export const enumColors: Record<ApplicationStatus, string> = {
  [ApplicationStatus.submitted]: "#3498db", //
  [ApplicationStatus.initial_review_completed]: "#27ae60", //
  [ApplicationStatus.background_verification_completed]: "#f1c40f", //
  [ApplicationStatus.final_review_completed]: "#8e44ad",
  [ApplicationStatus.approved]: "#2ecc71",
  [ApplicationStatus.rejected]: "#e74c3c", //
};

export enum ApplicationStatusKeys {
  submitted = "submitted",
  initial_review_completed = "initial_review_completed",
  background_verification_completed = "background_verification_completed",
  final_review_completed = "final_review_completed",
  approved = "approved",
  rejected = "rejected",
  // infoRequired = "INFO REQUIRED",
}

export type ApplicationStatusType = keyof typeof ApplicationStatusKeys;
