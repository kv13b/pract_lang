import { IsNumber, Length } from "class-validator";
export class ProductInput {
    id: string;
    @Length(3, 128)
    name: string;
    @Length(3, 256)
    description: string

    category_Id: string;
    image_url: string;
    @IsNumber()
    price: number;
    @IsNumber()
    avliability: boolean;

}