import { IsNumber, IsOptional, IsString, Length } from "class-validator";
export class ProductInput {
    @IsOptional()
    @IsString()
    id?: string;

    @Length(3, 128)
    name: string;

    @Length(3, 256)
    description: string;

    @IsString()
    category_id: string;

    @IsOptional()
    @IsString()
    image_url?: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    availability?: number;
}