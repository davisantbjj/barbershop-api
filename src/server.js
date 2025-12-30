require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

// Testar conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Conexão com banco de dados estabelecida com sucesso!');
  })
  .catch((err) => {
    console.warn('⚠️  Aviso: Não foi possível conectar ao banco de dados');
    console.warn('Verifique as credenciais no arquivo .env');
    console.warn('Erro:', err.message);
  });

// Sincronizar modelos com o banco de dados
sequelize.sync({ alter: false })
  .then(() => {
    console.log('📊 Tabelas sincronizadas com sucesso!');
  })
  .catch((err) => {
    console.error('❌ Erro ao sincronizar tabelas:', err);
  });

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação disponível em http://localhost:${PORT}/api-docs`);
});
