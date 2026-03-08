const animeService = require('../services/animeService')

exports.list = async (req, res) => {
  try {
    const animes = await animeService.list()
  res.status(200).json({
    success: true,
    data: animes
  })
 } catch (error) {
   console.error(error)
   res.status(500).json({ error: 'Erro interno do servidor'})
 }
}
exports.create = async (req, res) => {
  try {
    const { title, description } = 
req.body 

  if (!title || !description) {
    return res.status(400).json({ error:'Title e description são obrigatórios'})
  }

  const anime = await animeService.create(title, description)

  res.status(201).json(anime)
  
 } catch (error) {
   console.error(error)
   res.status(500).json({ error: 'Erro interno do servidor'})
 }
}
exports.update = async (req, res) => {
  try {
    const {id} = req.params
    const {title, description} = req.body
  
  if (!title || !description) {
    return res.status(400).json({ error:'Title e description são obrigatórios'})
  }
  const anime = await animeService.update(id, title, description)

  if(!anime) {
    return res.status(404).json({ error: 'Anime não encontrado'})
  }

  res.status(200).json(anime)
 } catch (error) {
   console.error(error)
   res.status(500).json({ error: 'Erro interno do servidor'})
 }
} 
exports.remove = async (req, res) => {
  try {
    const {id} = req.params

    const anime = await animeService.remove(id)

    if (!anime) {
      return res.status(404).json({ error: 'Anime não encontrado'})
    }

  res.status(200).json({ message: 'Anime removido com sucesso'})

 } catch (error) {
   console.error(error)
   res.status(500).json({ error: 'Erro interno do servidor'})
 }
}