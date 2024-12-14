export class CreateUserDto {
  fullName: string;
  displayName?: string;
  gender: string;
  email: string;
  phone?: string;
  password: string;
  mindThoughts?: string;
  dateOfBirth: string;
}
