import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import {S3} from "aws-sdk";
import {v4 as uuidv4} from "uuid";

const S3Client=new S3();
export const handler = async (event: APIGatewayEvent,
    Context: Context): Promise<APIGatewayProxyResult> => {
    try {
        console.log(`Received event: ${JSON.stringify(event)}`);
        console.log(`Context: ${JSON.stringify(Context)}`);
        const file=event.queryStringParameters?.file;
        const filename=`${uuidv4()}-${file}`;
        const s3params={
            Bucket: process.env.S3_BUCKET_NAME!,
            Key:filename,
            ContentType:"image/jpeg",
        }
        const url=await S3Client.getSignedUrlPromise("putObject",s3params);
        console.log("upload url",s3params,url);
        return {
            statusCode: 200,
            body: JSON.stringify({
               url,
               key:filename
            }),
        }
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Internal server error",
                error: error instanceof Error ? error.message : String(error)
            }),
        }
    }
}
