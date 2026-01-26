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



app.get('https://www.caelus.lol/status', (req, res) => {
    res.send("version1.0=true;tileData=By continuing to use caelus, you agree that meow mrrp meow :33 mrowmeowmrwormrow :333");
});


app.get('https://www.caelus.lol/', (req, res) => {
    const filePath = path.join(__dirname, 'games');
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "D" });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "" });
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});


app.get('https://www.caelus.lol/games/:gameId.json', (req, res) => {
    const gameId = req.params.gameId;
    const filePath = path.join(__dirname, 'games', `${gameId}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ error: `game ${gameId} ` });
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});




app.use((req, res) => {
    res.status(404).json({ error: "" });
});


app.listen(PORT, () => {
    console.log("========================================");
    console.log("   ");
    console.log(`   Port: ${PORT}`);
    console.log(`   Status: http://localhost:${PORT}/https://www.caelus.lol/status`);
    console.log("========================================");
});
