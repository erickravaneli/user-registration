import express from 'express'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getMissingFields = (data) => {
  const requiredFields = ['email', 'name', 'document', 'entityStartDate']
  return requiredFields.filter((field) => !data[field])
}

app.use(express.json())

app.use(cors())

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', (_, res) => {
  res.redirect('/registration')
})

app.get('/registration', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.post('/registration', (req, res) => {
  console.log('Dados recebidos: ', req.body)

  const data = req.body
  const missingFields = getMissingFields(data)

  if (missingFields.length > 0) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos', missingFields })
  }

  res.status(200).json({ message: 'Dados recebidos com sucesso!' })
})

app.listen(port, () => {
  console.log(`Servidor rodando`)
})
