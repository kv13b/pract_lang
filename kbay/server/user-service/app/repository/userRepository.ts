import type { UserModel } from "../models/UserModel";
import { injectable } from "tsyringe";
import { DBOperations } from "./dbOperations";
import type { ProfileInput } from "../models/dto/AddressInput";
import type { AddressModel } from "../models/AddressMode";
@injectable()
export class UserRepository extends DBOperations {
    constructor() {
        super();
    }

    async CreateAccount({ email, password, phone, salt, userType }: UserModel) {
        const query = `INSERT INTO "users" (email, password, phone, salt, user_type) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [email, password, phone, salt, userType];
        const res = await this.executeQurery(query, values);
        if (res.rows.length > 0) {
            return res.rows[0] as UserModel;
        }
    }
    async GetUserByEmail(email: string) {
        const query = `SELECT user_id, email, password, phone, verification_code, expiry, salt FROM "users" WHERE email = $1`;
        const values = [email];
        const res = await this.executeQurery(query, values);
        if (res.rows.length < 1) {
            return new Error("User not found");
        }
        return res.rows[0] as UserModel;
    }
    async UpdateVerificationCode(userID: number, code: number, expiry: Date) {
        const query = `UPDATE "users" SET verification_code = $1, expiry = $2 WHERE user_id = $3 and verified = FALSE RETURNING *`;
        console.log(userID, code, expiry);
        const values = [code, expiry, userID];
        const res = await this.executeQurery(query, values);
        if (res.rows.length > 0) {
            return res.rows[0] as UserModel;
        }
    }
    async UpdateVerifiedUser(userID: number) {
        const query = `UPDATE "users" SET verified = true WHERE user_id = $1 and verified=FALSE RETURNING *`;
        console.log(userID);
        const values = [userID];
        const res = await this.executeQurery(query, values);
        if (res.rows.length > 0) {
            return res.rows[0] as UserModel;
        }
        throw new Error("User already verified");
    }
    async updateUserProfile(user_id: number, firstName: string, lastName: string, userType: string) {
        const query = `UPDATE "users" SET first_name = $1, last_name = $2, user_type = $3 WHERE user_id = $4 RETURNING *`;
        console.log(user_id, firstName, lastName, userType);
        const values = [firstName, lastName, userType, user_id];
        const res = await this.executeQurery(query, values);
        if (res.rows.length > 0) {
            return res.rows[0] as UserModel;
        }
        throw new Error("User profile update failed");
    }

    async CreateProfile(user_id: number, { firstName,
        lastName,
        userType,
        address: { addressLine1, addressLine2, city, postalCode, country } }: ProfileInput) {
        console.log("Creating profile for user_id:", user_id);
        await this.updateUserProfile(user_id, firstName, lastName, userType);
        // Use table and column names from migration: table is "address" with columns address_line1, address_line2, city, post_code, country
        const query = `INSERT INTO "address" (address_line1, address_line2, city, post_code, country, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const postCodeValue = postalCode ? parseInt(String(postalCode), 10) : null;
        const values = [addressLine1, addressLine2, city, postCodeValue, country, user_id];
        const res = await this.executeQurery(query, values);
        if (res.rows.length > 0) {
            return res.rows[0] as AddressModel;
        }
        throw new Error("Address insertion failed");
    }
    async GetProfile(user_id: number) {
        const UserQuery = `SELECT first_name, last_name, email, phone,user_type,verified FROM "users" WHERE user_id = $1`;
        const values = [user_id];
        const UserQueryres = await this.executeQurery(UserQuery, values);
        if (UserQueryres.rows.length < 1) {
           throw new Error("Profile not found");
        }
        const UserProfile=UserQueryres.rows[0] as UserModel
        const AddressQuery = `SELECT id, address_line1, address_line2, city, post_code, country FROM "address" WHERE user_id = $1`;
        const addressRes = await this.executeQurery(AddressQuery, values);
        if(addressRes.rows.length>0){
            UserProfile.addresses=addressRes.rows as AddressModel[];
        }
        return UserProfile
    }
    async UpdateProfile(user_id: number, { firstName, lastName, userType, address: { addressLine1, addressLine2, city, postalCode, country,id } }: ProfileInput) {
        await this.updateUserProfile(user_id, firstName, lastName, userType);
        console.log("Updating address with id:", id, "for user_id:", user_id);
        const query = `UPDATE "address" SET address_line1 = $1, address_line2 = $2, city = $3, post_code = $4, country = $5 WHERE id = $6 RETURNING *`;
        const postCodeValue = postalCode ? parseInt(String(postalCode), 10) : null;
        const values = [addressLine1, addressLine2, city, postCodeValue, country, id];
        const res = await this.executeQurery(query, values);
        if (res.rows.length > 0) {
            return res.rows[0] as AddressModel;
        }
        throw new Error("Address update failed");
    }
}