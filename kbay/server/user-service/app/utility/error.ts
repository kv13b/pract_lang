import { validate, ValidationError } from "class-validator";

export const appValidationError = async (
  input: object
): Promise<ValidationError[] | false> => {
  const errors = await validate(input, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });
  console.log("Validation Errors:", errors);
  return errors.length ? errors : false;
};
