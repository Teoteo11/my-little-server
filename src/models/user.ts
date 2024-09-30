export interface User {
  fullName: string;
  phoneNumber: string;
  email: string;
  registrationDate: string;
  role: Role;
  gender: Gender;
  country: string;
}

export type Role = 'admin' | 'user';

export type Gender = 'male' | 'female' | 'other';