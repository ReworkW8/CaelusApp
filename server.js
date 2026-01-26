// version1.0=true
// LIVEDATA_START: Test :LIVEDATA_END

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

/**
 * Status-Endpunkt für die App-Kompatibilität
 * Liefert die Version und Daten für das Live Tile
 */
app.get('/CaelusApp/status', (req, res) => {
    res.send("version1.0=true;tileData=Test");
});


app.get('/CaelusApp/GamePage.json', (req, res) => {
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


app.get('/CaelusApp/games/:gameId.json', (req, res) => {
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
    console.log(`   Status: http://localhost:${PORT}/CaelusApp/status`);
    console.log("========================================");
});
