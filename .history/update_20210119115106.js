import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be updated
        Key: {
            authorId: "123", // The id of the author
            id: event.pathParameters.id, // The id of the note from the path
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET #le = :length, #cat = :category, #wat = :watchHref",
        ExpressionAttributeValues: {
            ":length": data.length || null,
            ":category": data.category || null,
            ":watchHref": data.watchHref || null,
        },
        ExpressionAttributeNames: {
            "#le": "length",
            "#cat": "category",
            "#wat": "watchHref"
        }
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW",
    };

    await dynamoDb.update(params);

    return { status: true };
});