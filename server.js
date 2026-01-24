const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} auf ${req.url}`);
    next();
});




app.get('/CaelusMasterServer/GamePage.json', (req, res) => {
    const filePath = path.join(__dirname, 'GamePage.json');
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "D" });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "" });
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});


app.get('/CaelusMasterServer/games/:gameId.json', (req, res) => {
    const gameId = req.params.gameId;
    const filePath = path.join(__dirname, 'games', `${gameId}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ error: `Spiel ${gameId} ` });
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});


app.get('/CaelusMasterServer/status', (req, res) => {
    res.json({
        status: "Online",
        service: "Caelus Master Server",
        version: "1.0.2",
        uptime: process.uptime()
    });
});



app.use((req, res) => {
    res.status(404).json({ error: "" });
});


app.listen(PORT, () => {
    console.log("========================================");
    console.log("   ");
    console.log(`   Port: ${PORT}`);
    console.log(`   Status: http://localhost:${PORT}/CaelusMasterServer/status`);
    console.log("========================================");
});