import { IsEmail, IsString, Length, IsDefined } from "class-validator";

export class LoginInput {
  @IsDefined()
  @IsEmail()
  email!: string;

  @IsDefined()
  @IsString()
  @Length(6, 30)
  password!: string;
}
