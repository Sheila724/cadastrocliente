# Usa imagem do Node.js
FROM node:22-alpine

# Cria diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY package*.json ./
COPY . .

# Instala dependências
RUN npm install

# Expõe a porta
EXPOSE 8213

# Comando para iniciar a aplicação (CORREÇÃO AQUI)
# Usa "exec" para substituir o shell atual pelo processo node, garantindo que as variáveis de ambiente sejam herdadas.
CMD ["sh", "-c", "exec node src/index.js"]

