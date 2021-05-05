
const accountRoutes = (app, fs) => {

    // variables
    dataPath = './db/err/err.json'

    // helper methods //segregate
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };


    /*
        // READ ALL
        app.get('/accounts', (req, res) => {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
    
                res.send(JSON.parse(data));
            });
        });
    
        // READ ONE
        app.get('/account/:id', (req, res) => {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                const accountId = req.params["id"]
                res.send(JSON.parse(data)[accountId.toString()])
            });
        });*/

    // CREATE
    app.post('/accounts', (req, res) => {
        if (req.body['_accid'] == '_sav')
            dataPath = './db/saving-accounts.json';
        else if (req.body['_accid'] == '_cur')
            dataPath = './db/current-accounts.json';
        else
            res.status(500).send("algo salio mal :''(");
        readFile(data => {
            // const newaccountId = new Date(Date.now());
            const prueb = JSON.stringify(data)

            n = 1;
            while (JSON.parse(prueb)[req.body['_accid'] + n.toString()] != null) {
                n++;
            }
            // req.body["creationDate"] = newaccountId.toUTCString()
            if (req.body['_accid'] == '_sav')
                req.body['rent'] = 0.05

            req.body["transactions"] = []
            req.body["status"] = false
            req.body["money"] = 0
            accid = req.body['_accid'] + n.toString()
            delete req.body._accid
            data[accid] = req.body;


            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).json({ "_accid": accid });
            }, dataPath);
        },
            true);
    });

    /*
        // UPDATE
        app.put('/account/:id', (req, res) => {
    
            readFile(data => {
    
                const accountId = req.params["id"];
    
                data[accountId] = req.body;
    
                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send(`accounts id:${accountId} updated`);
                });
            },
                true);
        });
    
    
        // DELETE
        app.delete('/account/:id', (req, res) => {
    
            readFile(data => {
                const accountId = req.params["id"];
                delete data[accountId];
    
                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send(`accounts id:${accountId} removed`);
                });
            },
                true);
        });*/
};

module.exports = accountRoutes;
