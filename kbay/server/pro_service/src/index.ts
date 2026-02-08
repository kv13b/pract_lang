import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export const handler = async (event: APIGatewayEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    console.log("Event: ", event);
    console.log("Context: ", context);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello World!",
            path:`${event.path},${event.pathParameters}`
        }),
    };
};
