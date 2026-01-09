import type { UserModel } from "../models/UserModel";
import { DBClient } from "../utility/dbClient";
import { injectable } from "tsyringe";
@injectable()
export class UserRepository {
    constructor() { }

    async CreateAccount({ email, password, phone, salt, userType }: UserModel) {
        const client = DBClient();
        await client.connect();
        const query = `INSERT INTO "users" (email, password, phone, salt, user_type) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [email, password, phone, salt, userType];
        const res = await client.query(query, values);
        await client.end();
        if (res.rows.length > 0) {
            return res.rows[0] as UserModel;
        }
    }
    async GetUserByEmail(email: string) {
         const client = DBClient();
        await client.connect();
                const query = `SELECT user_id, email, password, phone, salt FROM "users" WHERE email = $1`;
                const values = [email];
        const res = await client.query(query, values);
        await client.end();
        if (res.rows.length < 1) {
            return new Error("User not found");
        }
         return res.rows[0] as UserModel;
    }
}
