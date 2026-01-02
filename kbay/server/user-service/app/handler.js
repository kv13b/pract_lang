export const signup = async (event) => {
    console.log("Signup event:", event);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
            message: "User signed up successfully!"
        })
    };
};
