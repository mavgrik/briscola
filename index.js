const express = require("express");
const execSync = require('child_process').execSync;
const sqlite3 = require('sqlite3');
const path = require('path');
const bodyParser = require("body-parser");

const login = require("./js/login.js");

const app = express();
const port = 80;
const ip = execSync('ifconfig | grep inet | grep -v inet6 | cut -d" " -f2 | tail -n1', {encoding: 'utf-8'}).replace(/(\r\n|\n|\r)/gm, "");

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, () => {
  console.log(`\nServer avviato all'indirizzo http://${ip}:${port}\n`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/html/index.html'));
  login.execute(app);
});

let db = new sqlite3.Database('./db/user.db', (err) => {
  if (err) console.error(err.message);
});
console.log('Connesso al database con successo.');

module.exports = db;