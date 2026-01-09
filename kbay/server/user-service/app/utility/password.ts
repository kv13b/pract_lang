import bcrypt from "bcryptjs";

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
