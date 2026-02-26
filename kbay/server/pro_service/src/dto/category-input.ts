import { Length, IsOptional, IsString, IsArray, IsNumber } from "class-validator"

export class CategoryInput {
    @IsOptional()
    @IsString()
    id: string;

    @Length(3, 128)
    name: string;

    @IsOptional()
    @IsString()
    parentId?: string;

    @IsOptional()
    @IsArray()
    products: string[];

    @IsOptional()
    @IsNumber()
    displayOrder: number;

    @IsOptional()
    @IsString()
    imageUrl: string;
}
export class AddItemInput{
    @Length(3, 128)
    id:string;
    products: string[];
}