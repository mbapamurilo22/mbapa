function products_request_body(entity, productsObject, companyCredentials) {
    const data = JSON.stringify({
        "call": "UpsertProduto",
        "app_key": companyCredentials.key,
        "app_secret": companyCredentials.secret,
        "param": [
            {
                "codigo_produto_integracao": entity.entity_id,
                "codigo": entity.entity_id,
                "descricao": productsObject.nome,
                "unidade": "UN",
                "ncm": productsObject.ncm
            }
        ]
    });       
    
    return data;
}

module.exports.products_request_body = products_request_body;
