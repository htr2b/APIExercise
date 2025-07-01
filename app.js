const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.static('public'))

const DATA_FILE = path.join(__dirname, 'users.json');

app.get('/api/users', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'cannot read file' });
        res.json(JSON.parse(data));
    })
})

app.post('/api/users', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'cannot read file' });
        let users = JSON.parse(data);
        const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
        const user = { id, ...req.body };
        users.push(user);
        fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'couldnt write' });
            res.status(201).json(user);
        });
    });
});


app.delete('/api/users/:id', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'errr' });
        let users = JSON.parse(data);
        const id = Number(req.params.id);
        const newUsers = users.filter(u => u.id !== id);
        if (newUsers.length === users.length) {
            return res.status(404).json({ error: 'err' });
        }
        fs.writeFile(DATA_FILE, JSON.stringify(newUsers, null, 2), (err) => {
            if (err) return res.status(500).json({ error: err });
            res.status(204).end();
        });
    });
});



const PORT = 3000;
app.listen(PORT, () => console.log('host on: http://localhost:3000'));