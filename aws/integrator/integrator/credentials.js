function getCredentials(dynamoClient) {
    return new Promise((resolve) => {
        var params = {
            TableName : 'credentials'
        };
        
        dynamoClient.scan(params, function(err, data) {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else {             
                resolve(data.Items);
            }
        });
    }); 
}

module.exports.getCredentials = getCredentials;
