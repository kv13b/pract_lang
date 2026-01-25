import type { UserModel } from "../models/UserModel";
import { injectable } from "tsyringe";
import { DBOperations } from "./dbOperations";
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
    async UpdateVerificationCode(userID:string,code:number,expiry:Date){
        const query = `UPDATE "users" SET verification_code = $1, expiry = $2 WHERE user_id = $3 and verified = FALSE RETURNING *`;
        console.log(userID,code,expiry);
        const values = [code, expiry, userID];
        const res = await this.executeQurery(query, values);
        if (res.rows.length > 0) {
            return res.rows[0] as UserModel;
        }
    }
    async UpdateVerifiedUser(userID:string){
        const query = `UPDATE "users" SET Verified = true WHERE user_id = $1 and Verified=FALSE RETURNING *`;
        console.log(userID);
        const values = [userID];
        const res = await this.executeQurery(query, values);
        if (res.rows.length > 0) {
            return res.rows[0] as UserModel;
        }
        throw new Error("User already verified");
    }
}
