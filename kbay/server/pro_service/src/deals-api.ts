import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export const handler = async (event: APIGatewayEvent,
    Context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Received event: ${JSON.stringify(event)}`);
    console.log(`Context: ${JSON.stringify(Context)}`);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello from Deals API!",
            path: `${event.path},${event.httpMethod}`
        }),
    }
}
