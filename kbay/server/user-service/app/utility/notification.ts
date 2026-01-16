import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const fromPhone = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export const GenerateAccessCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000);
  const expiry = new Date(Date.now() + 30 * 60 * 1000); // 30 mins
  return { code, expiry };
};
export const SendVerification=async(
  code:number,
  toPhoneNumber:string
)=>{
   const message = await client.messages.create({
    body: `Your verification code is ${code} it will expire in 30 minutes.`,
    from: fromPhone,
    to: toPhoneNumber.trim(),
  });
  console.log(message);
  return message;
};
