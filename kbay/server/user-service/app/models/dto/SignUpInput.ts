import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { LoginInput } from "./LoginInput";

export class SignUpInput extends LoginInput {
    @IsNotEmpty()
    @Length(10, 13)
    phone!: string;

}