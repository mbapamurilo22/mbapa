const axios = require('axios');

const integratorApiUrl = "https://tlau7s7eze.execute-api.us-west-2.amazonaws.com/Prod/controller";

const integrate = (transactionType, entityId, entityType, entityObject) => {

    entityObject.id = entityId;

    const body = {
        "transaction_id": new Date().getTime(),
		"transaction_type": transactionType,
		"entity_id": entityId,
		"entity_type": entityType, 
		"object": entityObject
    }  

    console.log(body);
 
    axios.post(integratorApiUrl, body).then(
        () => {
            console.log('Successfully staged');
        },
        err => {
            console.log(err);
        }
    );
    
}

module.exports.integrate = integrate;
