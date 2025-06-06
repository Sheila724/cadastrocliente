const session = require('express-session');
const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session);

console.log('DISABLE_REDIS:', process.env.DISABLE_REDIS);

let sessionStore; // Declara a variável que armazenará o store de sessão

// Verifica se o Redis deve ser desabilitado, baseado na variável de ambiente
if (process.env.DISABLE_REDIS === 'true') {
  console.log('Conexão Redis desabilitada (DISABLE_REDIS=true). Usando armazenamento de sessão padrão (MemoryStore).');
  sessionStore = new session.MemoryStore(); // Define para usar MemoryStore
} else {
  // Lógica para conectar ao Redis
  console.log('Tentando conectar ao Redis...');

  // O REDIS_URL deve ser fornecido via variável de ambiente (e.g., "redis://localhost:6379" ou "redis://<host-redis>:6379")
  // Se não for fornecido, tentará conectar a 127.0.0.1:6379 como fallback
  const redisClient = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

  redisClient.on('connect', () => {
    console.log('Conectado ao Redis com sucesso!');
  });

  redisClient.on('error', (err) => {
    console.error('Erro de conexão do Redis:', err);
    // **Importante:** Se a conexão inicial com o Redis falhar,
    // o aplicativo pode precisar de um fallback ou de um tratamento de erro mais robusto.
    // Aqui, estamos definindo um fallback para MemoryStore em caso de erro,
    // para evitar que o aplicativo trave completamente.
    console.log('Falha na conexão com o Redis. Usando MemoryStore como fallback para armazenamento de sessão.');
    sessionStore = new session.MemoryStore(); // Fallback para MemoryStore
  });

  // Define o RedisStore. Note que o 'client' deve ser o 'redisClient' que criamos.
  sessionStore = new RedisStore({ client: redisClient });
}

// Exporta a configuração da sessão
module.exports = session({
  name: 'session', // Nome do cookie de sessão
  secret: process.env.SESSION_SECRET, // Sua chave secreta para assinar o cookie de sessão (obrigatório)
  resave: false, // Evita que a sessão seja salva de volta ao armazenamento se não tiver sido modificada
  saveUninitialized: false, // Evita salvar sessões "vazias" (novos visitantes sem dados de sessão)
  store: sessionStore, // Usa o armazenamento de sessão (MemoryStore ou RedisStore) configurado acima
  cookie: {
    secure: process.env.NODE_ENV === 'production' && process.env.USE_HTTPS === 'true', // 'true' apenas se o site estiver em HTTPS em produção
    maxAge: 3600000, // Tempo de vida do cookie em milissegundos (1 hora)
    httpOnly: true // Garante que o cookie só pode ser acessado via HTTP(S), não por JavaScript do lado do cliente
  }
});
