import type { APIGatewayProxyEventV2 } from "aws-lambda";
export declare const signup: (event: APIGatewayProxyEventV2) => Promise<{
    statusCode: number;
    headers: {
        "Access-Control-Allow-Origin": string;
        "Access-Control-Allow-Credentials": boolean;
    };
    body: string;
}>;
//# sourceMappingURL=handler.d.ts.map