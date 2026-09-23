const Database = require("better-sqlite3");
const path = require("path");

const dbPath = process.env.DATABASE_PATH || "./database.sqlite";

const db = new Database(path.resolve(dbPath));

db.pragma("foreign_keys = ON");

module.exports = db;