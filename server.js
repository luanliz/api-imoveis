const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Capturar o sinal de interrupção (Ctrl + C)
process.on('SIGINT', () => {
    console.log('Encerrando o servidor...');
    server.close(() => {
        console.log('Servidor encerrado.');
        process.exit(0);
    });
});