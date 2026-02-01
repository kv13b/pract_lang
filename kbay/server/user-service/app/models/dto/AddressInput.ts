import {Length, ValidateNested, IsDefined, IsOptional, MaxLength} from 'class-validator';
import { Type, Expose, Transform } from 'class-transformer';

export class AddressInput {
    @Expose()
    @Length(3, 32)
    addressLine1: string;
    @IsOptional()
    @MaxLength(32)
    @Expose()
    addressLine2?: string;

    @Expose()
    @Length(2, 32)
    city: string;

    @Expose()
    @Transform(({ obj }) => obj.postal_code ?? obj.postcode ?? obj.postalCode)
    @Length(2, 32)
    postalCode: string;

    @Expose()
    @Length(2, 32)
    country: string;
}
export class ProfileInput{
    @Expose()
    @Length(2,32)
    firstName: string;
    @Expose()
    @Length(2,32)
    lastName: string;
    @Expose()
    @Length(5,6)
    userType: string;
    @Expose()
    @IsDefined()
    @ValidateNested()
    @Type(() => AddressInput)
    address: AddressInput;
}