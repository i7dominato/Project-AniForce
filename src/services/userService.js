const pool = require('../config/database')
const bcrypt = require('bcrypt')
const e = require('express')

exports.register = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)

  const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
    [email, hashedPassword]
  )

  return result.rows[0]
}

const jwt = require('jsonwebtoken')

exports.login = async (email, password) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1',
    [email]
  )
  
  const user = result.rows[0]
  if (!user) return null

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) return null

  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m'}
  )

  const refreshToken = jwt.sign(
    { id: user.id},
    process.env.JWT_REFRESH_SECRET,
    {expiresIn: '7d' }
  )

  return { accessToken, refreshToken}
}

exports.refresh = (refreshToken) => {
  try{
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    )

    return newAccessToken
  } catch {
    return null
  }
}