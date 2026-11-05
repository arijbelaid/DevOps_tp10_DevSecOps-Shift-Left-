const express = require("express");
const { execFile } = require("child_process"); // Modifié : execFile au lieu de exec
const sqlite3 = require("sqlite3");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("./config");

const app = express();
app.use(express.json());

const db = new sqlite3.Database(":memory:");
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, role TEXT)");
  db.run("INSERT INTO users (name, role) VALUES ('alice', 'admin'), ('bob', 'user')");
});

// [CORRIGÉ] Injection SQL : requête paramétrée
app.get("/users", (req, res) => {
  const sql = "SELECT id, name FROM users WHERE name = ?";
  db.all(sql, [req.query.name], (err, rows) =>
  err ? res.status(500).send(err.message) : res.json(rows)
);

// [CORRIGÉ] Injection de commande : execFile avec validation
app.get("/ping", (req, res) => {
  const host = req.query.host;
  // Validation basique : uniquement des lettres, chiffres, points et tirets
  if (!/^[a-zA-Z0-9.-]+$/.test(host)) {
    return res.status(400).send("Hôte invalide");
  }
  execFile("ping", ["-c", "1", host], (err, stdout) => 
    res.type("text").send(stdout || String(err))
  );
});

// [CORRIGÉ] XSS réfléchi : renvoi en JSON (ou échappement HTML)
app.get("/hello", (req, res) => {
  const name = req.query.name || "";
  res.json({ message: "Bonjour " + name });
});

// [VULN] Prototype pollution (la faille vient de lodash 4.17.15, on corrigera dans la Partie 4)
app.post("/settings", (req, res) => {
  const settings = _.merge({}, req.body);
  res.json(settings);
});

// [CORRIGÉ] Jeton signé avec expiration (expiresIn)
app.post("/login", (req, res) => {
  const token = jwt.sign(
    { user: req.body.user, role: "user" }, 
    config.jwt_secret, 
    { expiresIn: "1h" } // Ajout de l'expiration
  );
  res.json({ token });
});

app.listen(config.port, () => console.log(`vuln-app écoute sur ${config.port}`));
