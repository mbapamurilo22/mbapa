const AWS = require('aws-sdk'); 
const writer = require('./writer.js');  
let response;
 
exports.lambdaHandler = async (event, context) => { 
    
    const dynamoClient = new AWS.DynamoDB.DocumentClient(); 

    try {
        const writtenTransaction = await writer.writer(event, dynamoClient);        
        
        if (writtenTransaction) {
            await new Promise(resolve => {                
                const sns = new AWS.SNS();
                const params = {
                    Message: JSON.stringify({
                        transaction_id: writtenTransaction?.transaction_id, 
                        entity_type: writtenTransaction?.entity_type
                    }),  
                    TopicArn: "arn:aws:sns:us-west-2:566321601732:controller-notification"
                };
                sns.publish(params, function(err) { 
                    if(err) {
                        console.log('Error publishing to SNS'); 
                    } else {
                        console.log('Message published to SNS'); 
                    }
                    resolve();
                });                  
            });                
        }

        response = {
            'statusCode': writtenTransaction ? 200 : 400,
            'body': JSON.stringify({
                message: writtenTransaction ? 'ok' : 'bad request',
            })
        }
    } catch (err) {
        console.log(err);
        
        response = {
            'statusCode': 500,
            'body': JSON.stringify({
                message: 'internal error',
            })
        }
    }

    return response
};
