const formatResponse = (statusCode: number, message: string, data?: any) => {
    if (data) {
        return {
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
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
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
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
export const errorResponse = (code = 1000, error: unknown) => {
    if (Array.isArray(error)) {
        // Recursively search for the first constraints object in ValidationError tree
        const findConstraints = (errObj: any): Record<string, string> | undefined => {
            if (!errObj) return undefined;
            if (errObj.constraints && Object.keys(errObj.constraints).length) return errObj.constraints;
            if (Array.isArray(errObj.children)) {
                for (const child of errObj.children) {
                    const c = findConstraints(child);
                    if (c) return c;
                }
            }
            return undefined;
        };
        const errorObject = findConstraints(error[0]);
        if (errorObject) {
            const firstKey = Object.keys(errorObject)[0];
            const errorMessage = errorObject[firstKey] || "Validation error";
            return formatResponse(code, errorMessage);
        }
        // Fallback: return a generic validation failed message and include raw errors
        return formatResponse(code, "Validation failed", error);
    }
    return formatResponse(code, `${error}`, error);
}