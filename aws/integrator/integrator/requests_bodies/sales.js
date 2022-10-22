function sales_request_body(entity, saleObject, companyCredentials) {
    const sale = saleObject.sale;
    const products = getItems(saleObject.products); 
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isNewSale = !sale.omieid;   
    
    const omieCall = getOmieCall(isNewSale); 
    console.log('Omie call:', omieCall);

    const data = JSON.stringify({
        "call": omieCall,
        "app_key": companyCredentials.key,
        "app_secret": companyCredentials.secret,
        "param": [
            {
                "cabecalho": {
                    "codigo_cliente_integracao": sale.cliente_id,
                    "codigo_pedido_integracao": String(sale.id),      
                    "numero_pedido": isNewSale ? sale.id : undefined,
                    "data_previsao": tomorrow.toLocaleDateString("pt-BR"),
                    "etapa": "10", 
                    "codigo_parcela": "999",
                    "quantidade_itens": products.length
                },
                "det": products,
                "frete": {
                    "modalidade": 1,
                    "valor_frete": sale.frete_valor
                },
                "informacoes_adicionais": {
                    "codigo_categoria": "1.01.03",
                    "codigo_conta_corrente": 9907801796,
                    "consumidor_final": "S",
                    "enviar_email": "N"
                }, 
            }
        ]
    });
    
    return data;
}

function getOmieCall(isNewSale) {
    if (isNewSale) {
        return 'IncluirPedido';
    }
    
    return 'AlterarPedidoVenda';
}

function getItems(products) {
    return products.map(item => {
        return {
            "ide": {
                "codigo_item_integracao": 2
            }, 
            "produto": {
                "cfop": "5.102",
                "codigo_produto_integracao": 2,
                "descricao": item.descricao.substring(0, 119),
                "ncm": item.ncm,
                "quantidade": item.quantidade,
                "tipo_desconto": "V",
                "unidade": "UN",
                "valor_desconto": 0,
                "valor_unitario": item.valor
            }
        }
    })         
}

module.exports.sales_request_body = sales_request_body;
