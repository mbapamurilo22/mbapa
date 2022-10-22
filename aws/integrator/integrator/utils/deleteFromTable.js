function deleteFromEntitiesTable(dynamoClient, id) {
    return new Promise((resolve) => {  
        dynamoClient.delete({
            "TableName": 'entities', 
            "Key" : {
                "id": id
            }
        }, function (err, data) {
            if (err) {
                console.log('Error trying to delete from entities' + err);
            }
            else {
                console.log("Succesfully deleted from entities"); 
            }
            resolve();
        });
    });
}


module.exports.deleteFromEntitiesTable = deleteFromEntitiesTable;