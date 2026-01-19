import { DBClient } from "../utility/dbClient";

export class DBOperations {
    constructor() { }

    async executeQurery(queryString: string, values: unknown[]) {
        const client = await DBClient();
        await client.connect();
        const result = await client.query(queryString, values);
        await client.end();
        return result;
    }
}