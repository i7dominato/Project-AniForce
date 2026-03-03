const pool = require('../config/database')

exports.list = async (req, res) => {
  try {
  const result = await 
pool.query('SELECT  * FROM animes')
  res.status(201).json(result.rows)
 } catch (error) {
   console.error(error)
   res.status(500).json({ error: 'Erro interno do servidor'})
 }
}
exports.create = async (req, res) => {
  try {
  const { title, description } = 
req.body 

  const result = await pool.query(
     'INSERT INTO animes (title, description) VALUES ($1, $2) RETURNING *',
    [title, description]
  )
  if (!title || !description) {
    return res.status(400).json({ error:'Title e description são obrigatórios'})
  }

  res.status(201).json(result.rows[0])
 } catch (error) {
   console.error(error)
   res.status(500).json({ error: 'Erro interno do servidor'})
 }
}
exports.update = async (req, res) => {
  try {
  const {id} = req.params
  const {title, description} = req.body
  
  const result = await pool.query(
    'UPDATE animes SET title = $1, description = $2 WHERE id = $3 RETURNING*',
     [title, description, id]
  )
  if (!title || !description) {
    return res.status(400).json({ error:'Title e description são obrigatórios'})
  }

  res.status(201).json(result.rows[0])
 } catch (error) {
   console.error(error)
   res.status(500).json({ error: 'Erro interno do servidor'})
 }
} 
exports.remove = async (req, res) => {
  try {
  const {id} = req.params

  const result = await pool.query(
    'DELETE FROM animes WHERE id = $1 RETURNING *',
    [id]
  )

  res.status(201).json(result.rows[0])
 } catch (error) {
   console.error(error)
   res.status(500).json({ error: 'Erro interno do servidor'})
 }
}