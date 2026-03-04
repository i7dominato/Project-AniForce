const pool = require('../config/database')

exports.list = async () => {
  const result = await 
pool.query('SELECT * FROM animes')
  return result.rows
}

exports.create = async (title, description) => {
  const result = await pool.query('INSERT INTO animes (title, description) VALUES ($1, $2) RETURNING *',
    [title, description]
  )
  return result.rows[0]
}

exports.update = async (id, title, description) => {
  const result = await pool.query('UPDATE animes SET title = $1, description = $2 WHERE id = $3 RETURNING *',
    [title, description, id]
  )
  return result.rows[0]
}

exports.remove = async (id) => {
  const result = await pool.query('DELETE FROM animes WHERE id = $1 RETURNING *',
    [id]
  )
  return result.rows[0]
}