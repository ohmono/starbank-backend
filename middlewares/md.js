for (const user of Object.values(accounts)) {
    if (user.username == req.body.username) {
        return res.send({ success: false, message: 'Username already exists' })
    };
    if (user.email == req.body.email) {
        return res.send({ success: false, message: 'Email already exists' })
    };
};

if (!account) {
    return res.send({ success: false, message: `Account with id ${id} not exists` });
}

