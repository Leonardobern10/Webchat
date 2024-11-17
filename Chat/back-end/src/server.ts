// Importações
import express, { Request, Response } from 'express'; //
import http from 'http';
import cors from 'cors';
import { Server, Socket } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Certifique-se de que o front-end está nesta URL
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket: Socket) => {
    console.log(`Usuário conectado: ${socket.id}`); // Verifique se isso aparece no console do servidor

    socket.on('send_message', (data) => {
        console.log('Mensagem recebida:', data);
        io.emit('receive_message', data); // Envia a mensagem para todos os clientes conectados
    });

    socket.on('disconnect', () => {
        console.log(`Usuário desconectado: ${socket.id}`);
    });
});

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor rodando...');
});

server.listen(3001, () => {
    console.log('Servidor rodando na porta 3001...');
});
