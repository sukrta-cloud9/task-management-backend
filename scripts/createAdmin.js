require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("../src/config/db");

const name = process.env.ADMIN_NAME;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!name || !email || !password) {
  console.error("Admin environment variables are missing");
  process.exit(1);
}

const existingAdmin = db
  .prepare("SELECT * FROM users WHERE email = ?")
  .get(email);

if (existingAdmin) {
  console.log("Admin already exists");
  process.exit(0);
}

const hashedPassword = bcrypt.hashSync(password, 10);

db.prepare(`
  INSERT INTO users (name, email, password, role)
  VALUES (?, ?, ?, 'admin')
`).run(name, email, hashedPassword);

console.log("Admin created successfully");