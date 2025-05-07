export interface AuthUser {
  isDeleted?: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: {
    _id: string;
    name: string;
  };
  password?: string;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  createdAt?: string;
  updatedAt?: string;
}
