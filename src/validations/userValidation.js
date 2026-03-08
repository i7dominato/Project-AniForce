const { z } = require('zod')

const registerSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 carcteres')
})

const loginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(1, 'Senha obrigatória')
})

module.exports = {
  registerSchema, 
  loginSchema 
}