function writer (event, dynamoClient) {
    return new Promise((resolve) => {
        const parsedBody = JSON.parse(event.body);

        const incomingData = {
            "transaction_id": parsedBody?.transaction_id,
            "transaction_type": parsedBody?.transaction_type,
            "entity_id": parsedBody?.entity_id,
            "entity_type": parsedBody?.entity_type, 
            "object": parsedBody?.object,
        }

        const tableName = "entities";
        const params = {
            TableName: tableName,
            Item: {
                ...incomingData,
                "id": (new Date()).getTime(),
                "registry_date": new Date().toISOString()
            }
        };

        console.log("Adding a new item...");
        dynamoClient.put(params, function(err, data) {
            if (err) {
                console.log(err);
                console.log("Could NOT add a new item...");
                resolve(false);
            } else {
                console.log("Item added succesfully!");
                resolve(parsedBody?.transaction_id);
            }
        });
    });    
}

module.exports.writer = writer;
