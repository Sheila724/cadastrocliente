require('dotenv').config();

const app = require('./app');
const connection = require('./db/connection');

const PORT = process.env.PORT || 8123;

connection
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.log(err));
