export interface Customer {
  id: string;
  name: string;
  surname: string;
  number: number;
  gender: 'MALE' | 'FEMALE';
  country: string;
  dependants: number;
  birthDate: string;
}