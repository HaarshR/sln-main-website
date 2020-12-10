export interface Member {
  _id?: string;
  dor: Date;
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  phoneNumber: number;
  social?: string;
  educInstitution: string;
  fieldOfStudy: string;
  questions: string[];
  answers: string[];
  department: string;
  membershipType: string;
  cv?: string;
}
