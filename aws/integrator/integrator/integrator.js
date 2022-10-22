const credentialsService = require('./credentials.js');
const requester = require('./requester.js');
const confirmer = require('./confirmer.js');

async function integrate(docClient, transaction) {
    const credential$ = await credentialsService.getCredentials(docClient);
    console.log(credential$);
    const credentials = credential$[0].omie_credentials;
     
    const data = await getData(docClient, transaction);   

    if (!data?.length) {
        console.log('No entity found in DynamoDB');
        return;
    }


    await new Promise((resolve) => {
        let requested = 0;
        
        data.forEach(async (item) => {
            console.log('requesting transaction ' + item.transaction_id + '...');
            
            const omie_registry_id = await requester.requester(item, credentials, docClient);
            
            if (omie_registry_id) {
                console.log('Successfully integrated in Omie');
                await confirmer.moveToSuccessfullTable(item, docClient); 
            } else {
                console.log('Error')
            }
            requested = requested + 1;
            if (requested === data.length) {
                resolve();
            }
        });
    });
   
}

function getData(docClient, transaction) {
    const params = {
        TableName : 'entities',
        FilterExpression : 'transaction_id = :transaction_id',
        ExpressionAttributeValues : {':transaction_id' : transaction?.transaction_id}
    };

    return new Promise((resolve) => {
        docClient.scan(params, function(err, data) {
            if (err) {
                console.log(err);
                resolve(false);
            } else {        
                resolve(data.Items);
            }
        }); 
    });
}

module.exports.integrate = integrate;
