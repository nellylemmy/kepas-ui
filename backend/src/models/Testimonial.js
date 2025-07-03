import pool from '../config/database.js';

class Testimonial {
  static async create({ author, quote, title, company }) {
    const result = await pool.query(
      'INSERT INTO testimonials (author, quote, title, company) VALUES ($1, $2, $3, $4) RETURNING *',
      [author, quote, title, company]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM testimonials WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async update(id, { author, quote, title, company }) {
    const result = await pool.query(
      'UPDATE testimonials SET author = $1, quote = $2, title = $3, company = $4 WHERE id = $5 RETURNING *',
      [author, quote, title, company, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM testimonials WHERE id = $1 RETURNING * ', [id]);
    return result.rows[0];
  }
}

export default Testimonial;
