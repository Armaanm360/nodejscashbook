export interface IAdmin {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  status: 0 | 1;
  type: string;
}

export interface IMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  status: 'active' | 'warning' | 'blacklisted';
  type: string;
}

export interface ITrainee {
  id: number;
  name: string;
  user_member_id: number;
  email: string;
  designation: string;
  avatar: string | null;
  phone: string | null;
  status: 0 | 1;
  type: string;
}

// forget password props interface
export interface IForgetPassProps {
  password: string;
  table: string;
  passField: string;
  userEmailField: string;
  userEmail: string;
}

// login interface
export interface ILogin {
  email: string;
  password: string;
}

export interface IPromiseRes<T> {
  success: boolean;
  message?: string;
  code: number;
  data?: T;
}
