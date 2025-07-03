import pool from '../config/database.js';

class Lead {
  static async create({ name, email, phone, message, source }) {
    const result = await pool.query(
      'INSERT INTO leads (name, email, phone, message, source) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, message, source]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    return result.rows;
  }
}

export default Lead;
