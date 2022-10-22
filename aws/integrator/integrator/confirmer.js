const deleteFromEntitiesTable = require('./utils/deleteFromTable.js');

async function moveToSuccessfullTable(entity, dynamoClient) { 
    return new Promise(async (resolve) => {  
        const tableName = "integrated_entities";
        const params = {
            TableName: tableName,
            Item: {
                ...entity,
                "id": (new Date()).getTime(),
                "integrated_date": new Date().toISOString()
            }
        };

        console.log("Including in integrate_entities table...");
        dynamoClient.put(params, function(err, data) {
            if (err) {
                console.log(err);
                console.log("Could NOT add in the integrate_entities table...");
                resolve(false);
            } else {
                console.log("Item added succesfully in the integrate_entities table!");
                resolve(true);
            }
        });

        await deleteFromEntitiesTable.deleteFromEntitiesTable(dynamoClient, entity.id);
    });
}

module.exports.moveToSuccessfullTable = moveToSuccessfullTable;
