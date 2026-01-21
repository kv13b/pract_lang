export interface UserModel {
    user_id?: string;
    email: string;
    password: string;
    phone: string;
    first_name?: string;
    last_name?: string;
    profile_pic?: string;
    verification_code?: number;
    expiry?: Date;
    salt: string;
    userType: "BUYER" | "SELLER";
}