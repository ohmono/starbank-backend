var fetch = require('node-fetch');

function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function create_random_accounts(req, res) {
    var number = parseInt(req.params.number);
    var id_sucursal = ['Santa Rosa', 'Medellin', ' Cali', 'Bucaramanga', 'Wuhan']
    var account_type = ['saving', 'current']

    let url = "http://localhost:3000/account";

    for (let i = 0; i <= number; i++) {
        var id_client = Math.floor(Math.random() * 100000000);

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "id_sucursal": random_item(id_sucursal),
                "id_client": id_client.toString(),
                "account_type": random_item(account_type)
            }),
            headers: { 'Content-Type': 'application/json' }
        })
    };

    res.send({ success: true, msg: `${number} accounts created successfully` });
};

module.exports = { create_random_accounts };