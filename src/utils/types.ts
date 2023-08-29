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
