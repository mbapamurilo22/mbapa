const AWS = require('aws-sdk');  
const integrator = require('./integrator.js');

 
let response;
 
exports.lambdaHandler = async (event, context) => { 
    
    const transaction = JSON.parse(event.Records?.[0]?.Sns?.Message || '{}');
    console.log('incoming transaction: ', transaction);

    if (transaction?.transaction_id && transaction?.entity_type) {
        const docClient = new AWS.DynamoDB.DocumentClient();
        await integrator.integrate(docClient, transaction);
    }
        
    try { 
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'ok', 
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
