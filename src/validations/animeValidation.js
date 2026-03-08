const { z } = require('zod')

const animeSchema = z.object({
  title: z.string().min(1, 'Titulo é obrigatório'),

  description: z.string().min(1, 'Descrição é obrigatória')
})

module.exports = {
  animeSchema  
}