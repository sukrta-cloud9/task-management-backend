const db = require("../config/db");

const Task = {
  create: (title, description, status, userId) => {
    const statement = db.prepare(`
      INSERT INTO tasks (title, description, status, user_id)
      VALUES (?, ?, ?, ?)
    `);

    const result = statement.run(
      title,
      description,
      status,
      userId
    );

    return Task.findById(result.lastInsertRowid);
  },

  findById: (id) => {
    const statement = db.prepare(`
      SELECT
        id,
        title,
        description,
        status,
        user_id,
        created_at
      FROM tasks
      WHERE id = ?
    `);

    return statement.get(id);
  },

  findByUserId: (userId) => {
    const statement = db.prepare(`
      SELECT
        id,
        title,
        description,
        status,
        user_id,
        created_at
      FROM tasks
      WHERE user_id = ?
      ORDER BY id DESC
    `);

    return statement.all(userId);
  },

  findAll: () => {
    const statement = db.prepare(`
      SELECT
        id,
        title,
        description,
        status,
        user_id,
        created_at
      FROM tasks
      ORDER BY id DESC
    `);

    return statement.all();
  },

  update: (id, title, description, status) => {
    const statement = db.prepare(`
      UPDATE tasks
      SET title = ?, description = ?, status = ?
      WHERE id = ?
    `);

    statement.run(
      title,
      description,
      status,
      id
    );

    return Task.findById(id);
  },

  deleteById: (id) => {
    const statement = db.prepare(`
      DELETE FROM tasks
      WHERE id = ?
    `);

    return statement.run(id);
  }
};

module.exports = Task;