# 📘 Projeto de Demonstração - Plataforma Web

Este projeto foi desenvolvido com o objetivo de demonstrar meu conhecimento em tecnologias voltadas para o desenvolvimento de plataformas web. Ele atende aos requisitos descritos no [desafio oficial do Mercado Bitcoin](https://github.com/mercadobitcoin/desafio-mb-web?tab=readme-ov-file).

---

## 🔗 Link de demonstração

O projeto está publicado no Render e pode ser acessado através do link (aparentemente o projeto não fica disponível o tempo todo por limitação da conta gratuita):

👉 [https://user-registration-h4ax.onrender.com](https://user-registration-h4ax.onrender.com)

---

## ✅ Requisitos Atendidos

- Renderização de um formulário multistep no frontend
- Backend com API simulando o recebimento de dados (sem persistência)
- Separação entre client e server (Vue + Express)
- Envio dos dados ao final do formulário para a API
- Validação dos campos obrigatórios

---

## 🔧 Funcionalidades Adicionais

### 🧠 Arquitetura

- **Componentes assíncronos** com `defineAsyncComponent` para melhorar a performance.
- **Composables reutilizáveis** para centralizar lógica de negócio e validações.
- **Separação clara** entre responsabilidades de componentes, lógica de validação e navegação.

### 🧪 Testes

- Testes unitários com **Vitest** cobrindo:
  - Todos os **composables**
  - Arquivos auxiliares de lógica (ex: `fetchApi`)

### 🎨 UI e UX

- Componentização completa do formulário
- Animações de transição entre os passos utilizando `Transition`
- Checkbox de “mostrar senha”

---

## 📋 Validações Implementadas

Todas as validações são feitas no frontend antes de enviar para o backend. Utilizam um composable `useValidation` reutilizável com as seguintes regras:

- `required`: Campo obrigatório
- `email`: Validação de formato de e-mail
- `minLength`: Validação de tamanho mínimo (ex: senha)
- `cpf`: Validação de formato para CPF
- `cnpj`: Validação de formato para CNPJ
- `date`: Validação de data no formato `DD/MM/AAAA`
- `phone`: Validação de número de telefone com DDD

---

## 🚀 Como rodar o projeto

Você pode rodar o projeto localmente com os seguintes passos:

```bash
npm install
npm run dev
```

```bash
cd server
npm install
npm run start
```

Ou então utilizar o comando build para rodar apenas o backend node:

```bash
npm install
npm run build
cd server
npm install
npm run start
```
