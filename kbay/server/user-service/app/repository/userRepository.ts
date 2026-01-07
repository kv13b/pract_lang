import type { UserModel } from "../models/UserModel";

export class UserRepository {
    constructor() {}

    async CreateAccount({ email, password, phone, salt, userType }: UserModel) {
        console.log("UserRepository: CreateAccount called");
        // Here, you would typically interact with your database to create the user account.
    }
}
