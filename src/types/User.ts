export interface User {
  id: number;
  first_name: string;
  last_name: string;
  birth_data: string;
  gender: string;
  job: string;
  biography: string;
  is_active: boolean;
}

export interface NewUser {
  first_name: string;
  last_name: string;
  birth_data: string;
  gender: string;
  job: string;
  biography: string;
  is_active: boolean;
}
