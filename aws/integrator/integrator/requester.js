const https = require('https'); 
const failer = require('./failer.js');
const customers_request_body = require('./requests_bodies/customers.js');
const products_request_body = require('./requests_bodies/products.js');
const sales_request_body = require('./requests_bodies/sales.js');

async function requester(entity, credentials, dynamoClient) {
    return new Promise((resolve) => {
        const entityObject = entity.object; 

        let data;
        
        console.log('entity type: ', entity.entity_type);
        
        if (entity.entity_type === 'customers') {
            data = customers_request_body.customers_request_body(entity, entityObject, credentials);
        }
        
        if (entity.entity_type === 'products') {
            data = products_request_body.products_request_body(entity, entityObject, credentials);
        }
        
        if (entity.entity_type === 'sales') {
            data = sales_request_body.sales_request_body(entity, entityObject, credentials);
        }
        
        const options = {
            hostname: 'app.omie.com.br',
            path: getOmieUrl(entity.entity_type),
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
        };
        
        const req = https.request(options, async (res) => {
            const statusCode = res.statusCode;
            console.log(`statusCode: ${statusCode}`);
            if (statusCode === 200) {
                
                console.log('Omie OK response:');
                
                let raw_response_body;
                
                await new Promise(resolve => {
                    res.on('data', async function (body) {
                        raw_response_body = body;
                        resolve();
                    });
                }); 
                
                const omie_registry_id = getOmieRegistryId(raw_response_body, entity.entity_type);
                
                resolve(omie_registry_id);
            } else {
                res.setEncoding('utf8');

                await new Promise(resolve => {
                    res.on('data', async function (body) {
                        console.log('BODY: ' + body); 
                        await failer.moveToFailedTable(entity, dynamoClient);
                        resolve();
                    });
                });                

                resolve(false);
            }
        });
         
        req.on('error', async (error) => {
            await failer.failer(entity.transaction_id, 'Could not connect to OMIE');
            await failer.moveToFailedTable(entity, dynamoClient);
            console.log(error);
            resolve(false);
        });
        
        req.write(data);
        req.end();
    });
} 

function getOmieRegistryId(rawResponseBody, entity_type) {
    const response = JSON.parse(rawResponseBody);
    
    console.log('Omie OK response:', response);
    
    if (entity_type === 'sales') {
        return Number(response.numero_pedido);
    }
    
    return '-';
}

function getOmieUrl(entity_type) {
    if (entity_type === 'customers') {
        return '/api/v1/geral/clientes/';
    }
    
    if (entity_type === 'products') {
        return '/api/v1/geral/produtos/';
    }
    
    if (entity_type === 'sales') {
        return '/api/v1/produtos/pedido/';
    }
}

module.exports.requester = requester;
