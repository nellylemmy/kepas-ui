import pool from '../config/database.js';

class Post {
  static async create({ title, content, author }) {
    const result = await pool.query(
      'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
      [title, content, author]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async update(id, { title, content, author }) {
    const result = await pool.query(
      'UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *',
      [title, content, author, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING * ', [id]);
    return result.rows[0];
  }
}

export default Post;
