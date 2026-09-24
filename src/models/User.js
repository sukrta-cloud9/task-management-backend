const db = require("../config/db");

const User = {
  create: (name, email, password, role = "user") => {
    const statement = db.prepare(`
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `);

    const result = statement.run(name, email, password, role);

    return {
      id: result.lastInsertRowid,
      name,
      email,
      role
    };
  },

  findByEmail: (email) => {
    const statement = db.prepare(`
      SELECT * FROM users
      WHERE email = ?
    `);

    return statement.get(email);
  },

  findById: (id) => {
    const statement = db.prepare(`
      SELECT id, name, email, role, created_at
      FROM users
      WHERE id = ?
    `);

    return statement.get(id);
  },

  findAll: () => {
  const statement = db.prepare(`
    SELECT id, name, email, role, created_at
    FROM users
  `);

  return statement.all();
},

deleteById: (id) => {
  const statement = db.prepare(`
    DELETE FROM users
    WHERE id = ?
  `);

  return statement.run(id);
}
};

module.exports = User;