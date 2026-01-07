import bcrypt from "bcrypt"
export const getSalt = async () => { 
    return await bcrypt.genSalt();
};
export const hashPassword = async (password: string, salt: string) => { 
    return await bcrypt.hash(password, salt);
};      
export const validatePassword = async (password: string, hashedPassword: string, salt: string) => { 
    return await hashPassword(password, salt) === hashedPassword;
};