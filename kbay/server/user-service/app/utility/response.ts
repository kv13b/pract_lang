const formatResponse = (statusCode: number, message: string, data?: any) => {
    if (data) {
        return {
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
                message,
                data
            })
        };
    } else {
        return {
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
                message,
                data
            })
        };
    }
};
export const successResponse = ( data:Object) => {
    return formatResponse(200, "success", data);
}
export const errorResponse = (code=1000,error:unknown) => {
    if(Array.isArray(error)){
        const errorObject=error[0].constraints;
        const errorMessage=errorObject[Object.keys(errorObject)[0]]||"Error occurred";
        return formatResponse(code, errorMessage);
    }
    return formatResponse(code, `${error}`,error);
}