import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
            // The attributes of the item to be created
            authorId: "123", // The id of the author
            id: uuid.v1(), // A unique uuid
            length: data.length, // Parsed from request body
            category: data.category, // Parsed from request body
            watchHref: data.watchHref,
            createdAt: Date.now(), // Current Unix timestamp
        },
    };


    await dynamoDb.put(params).promise();

    return params.Item;
}