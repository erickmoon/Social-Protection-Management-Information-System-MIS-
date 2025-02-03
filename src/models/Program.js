const db = require('../config/database');

class Program {
  static tableName = 'programs';

  static async getAll() {
    return db(this.tableName)
      .select('*')
      .orderBy('created_at', 'desc');
  }

  static async getById(id) {
    return db(this.tableName)
      .where({ id })
      .first();
  }

  static async create(data) {
    const [program] = await db(this.tableName)
      .insert(data)
      .returning('*');
    return program;
  }

  static async update(id, data) {
    const [updated] = await db(this.tableName)
      .where({ id })
      .update(data)
      .returning('*');
    return updated;
  }

  static async delete(id) {
    return db(this.tableName)
      .where({ id })
      .del();
  }
}

module.exports = Program;