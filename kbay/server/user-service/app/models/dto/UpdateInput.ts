import { Length } from "class-validator";

export class VerifyInput{
    @Length(6)
    code: string;
}