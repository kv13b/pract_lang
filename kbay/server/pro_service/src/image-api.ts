import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import {S3} from "aws-sdk";
import {v4 as uuidv4} from "uuid";

export const handler = async (event: APIGatewayEvent,
    Context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Received event: ${JSON.stringify(event)}`);
    console.log(`Context: ${JSON.stringify(Context)}`);
    const file=event.queryStringParameters?.file;
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello from Deals API!",
            path: `${event.path},${event.httpMethod}`
        }),
    }
}
