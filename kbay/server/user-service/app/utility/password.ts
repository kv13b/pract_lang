import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { UserModel } from "../models/UserModel";
const APP_SECRET = "kbaysecretkey";

export const getSalt = async () => {
  return await bcrypt.genSalt(10);
};

export const hashPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const GetToken = ({ email, password, phone, userType }: UserModel) => {
  return jwt.sign({ email, password, phone, userType }, APP_SECRET, { expiresIn: "10d" });
}
export const VerifyToken = async (token:string):Promise<UserModel |false>=>{
  try{
    console.log("verifying token",token);
    if(token!==""){
      const decoded =await jwt.verify(token, APP_SECRET) as UserModel;
      return decoded;
    }
    return false;
  }catch(err){
    console.log("Token verification error:", err);
    return false;
  } 
}