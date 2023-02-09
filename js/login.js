const login = require("./lobby.js");

module.exports = {
    name: "login",
    async execute(app) {
        app.post("/", (req, res) => {
            
            const db = require("../index.js");

            const nick = req.body.nickname;

            var nuovo = false;

            db.all(`SELECT * FROM users WHERE nick = ${nick}`, (err, row) => {
                if (err) return console.error(err.message);

                var exist = row[0];

                if (exist == null) {
                    nuovo = true;
                    db.exec(`INSERT INTO users VALUES ('${nick}', '0', '0', '0', '0', '0')`);
                }
            });
  
            login.execute(res, nick, nuovo);

            console.log(nick);
        });
    }
}