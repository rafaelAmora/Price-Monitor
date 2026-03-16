# 📉 PriceMonitor

Uma API REST que monitora preços de produtos da **Amazon** e envia um **e-mail de alerta** automaticamente quando o preço cai abaixo do valor desejado pelo usuário.

---

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/)
- [Cheerio](https://cheerio.js.org/) + [Axios](https://axios-http.com/) — Web scraping
- [Nodemailer](https://nodemailer.com/) — Envio de e-mails
- [node-cron](https://www.npmjs.com/package/node-cron) — Agendamento de tarefas
- [Zod](https://zod.dev/) — Validação de dados
- [Bcrypt](https://www.npmjs.com/package/bcrypt) — Criptografia de senhas
- [Docker](https://www.docker.com/) — Banco de dados em container

---

## ⚙️ Como funciona

1. O usuário se cadastra e registra produtos da Amazon com um **preço desejado**
2. A cada **5 horas**, um job automático verifica o preço atual de cada produto via scraping
3. Se o preço atual estiver abaixo do desejado, o usuário recebe um **e-mail de alerta** com os detalhes e a imagem do produto
4. O sistema evita spam: um novo e-mail só é enviado se passaram pelo menos **5 horas** desde o último

---

## 🛠️ Configuração

### Pré-requisitos

- Node.js 18+
- Docker

### 1. Clone o repositório

```bash
git clone https://github.com/rafaelAmora/pricemonitor.git
cd pricemonitor
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="postgresql://postgres:Brasil@031025@localhost:5432/priceMonitor"
PORT=3333

# Conta Gmail usada para enviar os alertas
USER_EMAIL=seuemail@gmail.com
USER_PASSWORD=sua_senha_de_app
```

> 💡 Para o Gmail funcionar, você precisa gerar uma **senha de app** nas configurações de segurança da conta Google.

### 4. Suba o banco de dados com Docker

```bash
docker-compose up -d
```

### 5. Execute as migrations do Prisma

```bash
npx prisma migrate dev
```

### 6. Inicie o servidor

```bash
npm run dev
```

O servidor estará em `http://localhost:3333`.

---

## 📌 Endpoints

### Usuários

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/user` | Cria um novo usuário |

#### `POST /user`

```json
{
  "name": "Rafael",
  "email": "rafael@email.com",
  "password": "senha123"
}
```

---

### Produtos

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/product` | Cadastra um produto para monitorar |

#### `POST /product`

```json
{
  "url": "https://www.amazon.com.br/dp/...",
  "nome": "Teclado Mecânico",
  "precoDesejado": 250.00,
  "usuarioId": "uuid-do-usuario"
}
```

> ⚠️ Atualmente apenas URLs da **Amazon Brasil** (`amazon.com.br`) são suportadas.

---

## 📧 E-mail de alerta

Quando o preço cai abaixo do desejado, o usuário recebe um e-mail com:

- Preço atual e preço desejado
- Imagem do produto
- Aviso para não perder a oferta

---

## 🏗️ Build para produção

```bash
npm run build
npm start
```

---

## 🗺️ Roadmap

- [x] Cadastro de usuários
- [x] Cadastro de produtos para monitorar
- [x] Scraping de preços da Amazon
- [x] Envio de e-mail de alerta
- [x] Job automático a cada 5 horas
- [ ] Autenticação com JWT
- [ ] Suporte a outros e-commerces (Mercado Livre, Magazine Luiza...)
- [ ] Rota para listar/deletar produtos monitorados
- [ ] Dashboard de histórico de preços

---

## 👨‍💻ㅤAutor

Feito por [rafaelAmora](https://github.com/rafaelAmora)
