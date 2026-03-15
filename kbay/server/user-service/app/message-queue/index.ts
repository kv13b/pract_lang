import axios from "axios";

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:3000/products-queue";

export const PullData = async (request_Data:Record<string, unknown>) =>{
    return axios.post(PRODUCT_SERVICE_URL,request_Data)
}

