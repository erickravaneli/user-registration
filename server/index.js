import express from 'express'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getMissingFields = (data) => {
  if (data.type === 'personal') {
    return getMissingPersonalFields(data)
  } else if (data.type === 'business') {
    return getMissingBusinessFields(data)
  }
  return []
}

const getMissingPersonalFields = (data) => {
  const requiredFields = ['email', 'personalName', 'cpf', 'dateOfBirth', 'phone', 'password']
  return requiredFields.filter((field) => !data[field])
}

const getMissingBusinessFields = (data) => {
  const requiredFields = ['email', 'businessName', 'cnpj', 'businessStartDate', 'phone', 'password']
  return requiredFields.filter((field) => !data[field])
}

app.use(express.json())

app.use(cors())

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/registration', (req, res) => {
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
  console.log(`Servidor rodando em http://localhost:${port}`)
})
