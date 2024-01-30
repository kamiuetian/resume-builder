import mysql from "serverless-mysql";

var db = mysql({
    config: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }
});



export async function execQuery({ query, values }: { query: string, values?: any }) {
    try {
        const results = await db.query(query, values);
        await db.end();
        console.log(results)
        return results;
    } catch (error) {
        return { error };
    }
}