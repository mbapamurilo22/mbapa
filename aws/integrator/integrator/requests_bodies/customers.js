function customers_request_body(entity, customerObject, companyCredentials) {
    const data = JSON.stringify({
        "call": "UpsertCliente",
        "app_key": companyCredentials.key,
        "app_secret": companyCredentials.secret,
        "param": [
            {
                "codigo_cliente_integracao": entity.entity_id,
                "razao_social": customerObject.razao_social,
                "nome_fantasia": customerObject.nome_fantasia,
                "cnpj_cpf": customerObject.docn,
                "endereco": customerObject.rua,
                "endereco_numero": customerObject.numero,
                "bairro": customerObject.bairro,
                "complemento": customerObject.complemento,
                "estado": customerObject.estado,
                "cidade": customerObject.municipio,
                "cep": customerObject.cep,
                "codigo_pais": 'BR',
                "inscricao_estadual": customerObject.inscricao_estadual,
                "inscricao_municipal": customerObject.inscricao_municipal 
            }
        ]
    });       
    
    return data;
}

module.exports.customers_request_body = customers_request_body;
