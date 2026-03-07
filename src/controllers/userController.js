const userService = require('../services/userService')

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha obrigatórios'})
    }
    const user = await userService.register(email, password)

    res.status(201).json(user)

  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário'})
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const tokens = await userService.login(email, password)

    if (!tokens) {
      return res.status(401).json({ error: 'Credenciais inválidas'})
    }
    
    res.status(200).json(tokens)

  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login'})
  }
}

exports.refresh = (req, res) => {
  const { refreshToken } = req.body

  const newToken = userService.refresh(refreshToken)

  if (!newToken) {
    return res.status(401).json({ error: 'Refresh token invalido'})
  }

  res.json({ accessToken: newToken })
}