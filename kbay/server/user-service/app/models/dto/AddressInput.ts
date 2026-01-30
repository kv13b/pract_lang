import {Length} from 'class-validator';

export class AddressInput {
    @Length(3, 32)
    addressLine1: string;
    addressLine2?: string;

    @Length(2, 32)
    city: string;

    @Length(2, 32)
    postalCode: string;

    @Length(2, 32)
    country: string;
}
export class ProfileInput{
    @Length(2,32)
    firstName: string;
    @Length(2,32)
    lastName: string;
    @Length(5,6)
    userType: string;
    address:AddressInput;
}