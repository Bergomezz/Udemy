const buildEnv = () => {
    cy.server()

    cy.route({
        method: 'POST',
        url: '/signin',
        response: {
            id: 2500,
            nome: 'Usuario falso',
            token: 'Uma string muito grande',
        },
    }).as('signin')

    cy.route({
        method: 'GET',
        url: '/saldo',
        response: [
            {
                conta_id:999,
                conta: 'Carteira',
                saldo:100.00,
            },
            {
                conta_id:9909,
                conta: 'Banco',
                saldo:1000000.00,
            },
        ],
    }).as('saldo')

    cy.route({
        method: 'GET',
        url: '/contas',
        response: [
            {id:1, nome: 'Carteira', visivel:true, usuario_id:26655},
            {id:2, nome: 'Banco', visivel:true, usuario_id:26655},
    ]
    }).as('contas')

    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
            {"conta":"Conta para movimentacoes","id":921609,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2021-12-30T03:00:00.000Z","data_pagamento":"2021-12-30T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":990586,"usuario_id":26655,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta com movimentacao","id":921610,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2021-12-30T03:00:00.000Z","data_pagamento":"2021-12-30T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":990587,"usuario_id":26655,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":921611,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-12-30T03:00:00.000Z","data_pagamento":"2021-12-30T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":990588,"usuario_id":26655,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":921612,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-12-30T03:00:00.000Z","data_pagamento":"2021-12-30T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":990588,"usuario_id":26655,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":921613,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2021-12-30T03:00:00.000Z","data_pagamento":"2021-12-30T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":990588,"usuario_id":26655,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para extrato","id":921614,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2021-12-30T03:00:00.000Z","data_pagamento":"2021-12-30T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":990589,"usuario_id":26655,"transferencia_id":null,"parcelamento_id":null}
        ]
    })
}

export default buildEnv;