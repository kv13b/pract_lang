import { Length, IsString } from "class-validator";

export class ServiceInput{
    @IsString()
    action: string;
    
    @Length(12,24)
    productId: string;
}