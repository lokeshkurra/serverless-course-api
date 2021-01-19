import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(context, event) {

    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
            id: uuid.v1(),
            title: data.title,
            watchHref: data.watchHref,
            authorId: data.author,
            length: data.length,
            category: data.category,
            createdAt: Date.now()
        },
    };

    try {
        await dynamoDb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message }),
        };
    }

}