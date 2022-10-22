const deleteFromEntitiesTable = require('./utils/deleteFromTable.js');

async function moveToFailedTable(entity, dynamoClient) {
    return new Promise(async (resolve) => {  
        const tableName = "failed_entities";
        const params = {
            TableName: tableName,
            Item: {
                ...entity,
                "id": (new Date()).getTime(),
                "failed_date": new Date().toISOString()
            }
        };

        console.log("Including in failed_entities table...");
        
        dynamoClient.put(params, function(err, data) {
            if (err) {
                console.log(err);
                console.log("Could NOT add in the failed_entities table...");
                resolve(false);
            } else {
                console.log("Item added succesfully in the failed_entities table!");
                resolve(true);
            }
        });

        await deleteFromEntitiesTable.deleteFromEntitiesTable(dynamoClient, entity.id);
    });
}

module.exports.moveToFailedTable = moveToFailedTable;
