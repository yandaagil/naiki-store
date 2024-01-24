export type User = {
  id: string;
  fullname: string;
  email: string;
  role: string;
  image: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
  type?: string;
};
