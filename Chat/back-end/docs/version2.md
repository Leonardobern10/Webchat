# Server.ts

Ele é a implementação de um **servidor de chat em tempo real** utilizando **Socket.IO** com **Express** em Node.js. Vou dividir a explicação em partes e explicar o que cada trecho faz e a razão por trás de sua implementação.

### 1. **Importações e Configuração Inicial**

```typescript
import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
```

-   **`express`**: Importa o framework **Express**, que facilita a criação de servidores HTTP em Node.js. Ele fornece métodos para configurar rotas, middleware, etc.
-   **`http`**: Este módulo nativo do Node.js é usado para criar o servidor HTTP. O `http.createServer()` cria uma instância de servidor que podemos associar ao **Socket.IO**.

-   **`cors`**: Esse módulo é utilizado para **habilitar CORS** (Cross-Origin Resource Sharing), permitindo que o frontend (que geralmente está em uma porta diferente do backend) possa fazer requisições para o backend. Aqui, o CORS é configurado para permitir que o frontend, hospedado em `http://localhost:3000`, acesse o servidor backend.

-   **`socket.io`**: A principal biblioteca utilizada para habilitar comunicação **em tempo real** via WebSockets. A classe **`Server`** cria o servidor de WebSocket, e a classe **`Socket`** representa a instância de conexão de cada cliente.

---

### 2. **Inicialização do Express e Server**

```typescript
const app = express();
app.use(cors());
```

-   **`app`**: Aqui, uma instância do **Express** é criada, e o middleware **`cors()`** é aplicado a todas as rotas. O CORS é importante porque permite que o frontend acesse o backend mesmo que ambos estejam em portas ou domínios diferentes.

---

### 3. **Criação do Servidor HTTP**

```typescript
const server = http.createServer(app);
```

-   **`server`**: O **servidor HTTP** é criado usando a instância do **Express** (`app`). Essa instância de servidor é usada para configurar o **Socket.IO**, permitindo que a comunicação em tempo real ocorra por meio do WebSocket.

---

### 4. **Criação do servidor WebSocket com Socket.IO**

```typescript
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Certifique-se de que o front-end está nesta URL
        methods: ['GET', 'POST'],
    },
});
```

-   **`io`**: Aqui, criamos uma instância do **Socket.IO** associada ao servidor HTTP. Ele permite que clientes (o frontend, no caso) se conectem ao servidor para enviar e receber mensagens em tempo real.

-   **Configuração CORS**: Especifica que **somente o frontend hospedado em `http://localhost:3000`** poderá se comunicar com esse servidor. Sem essa configuração, o navegador bloqueia requisições de outros domínios ou portas diferentes.

---

### 5. **Evento de Conexão**

```typescript
io.on('connection', (socket: Socket) => {
    console.log(`Usuário conectado: ${socket.id}`); // Verifique se isso aparece no console do servidor
```

-   **`io.on('connection', callback)`**: Este é um **evento de conexão** que é disparado sempre que um **cliente** se conecta ao servidor via WebSocket. O **`socket.id`** é um identificador único gerado para cada cliente que se conecta, o que permite distinguir diferentes clientes conectados ao servidor.

-   **`socket`**: Cada cliente conectado tem sua própria instância de `socket`, que é usada para **emitir eventos** (enviar mensagens) ou **escutar eventos** (receber mensagens).

---

### 6. **Recebendo e Enviando Mensagens**

```typescript
socket.on('send_message', (data) => {
    console.log('Mensagem recebida:', data);
    io.emit('receive_message', data); // Envia a mensagem para todos os clientes conectados
});
```

-   **`socket.on('send_message', callback)`**: Este evento escuta quando um **cliente envia uma mensagem**. O cliente emite o evento `send_message`, e os dados da mensagem são passados como parâmetro para o callback (armazenados na variável `data`).

-   **`io.emit('receive_message', data)`**: O servidor então **emite** um evento `receive_message` para **todos os clientes conectados**, passando a **mensagem recebida**. Isso significa que a mensagem será enviada para todos os clientes, permitindo um **chat em tempo real**.

    -   **`io.emit`**: Emite um evento para **todos os sockets** (clientes) conectados no servidor. Isso é ideal para um chat onde todas as mensagens devem ser transmitidas para todos os participantes.

---

### 7. **Desconexão de um Cliente**

```typescript
socket.on('disconnect', () => {
    console.log(`Usuário desconectado: ${socket.id}`);
});
```

-   **`socket.on('disconnect', callback)`**: Este evento é disparado quando um cliente **desconecta** do servidor (seja por erro, fechamento da aplicação ou desconexão manual). O servidor registra a desconexão e exibe no console qual **`socket.id`** foi desconectado.

---

### 8. **Rota GET Inicial**

```typescript
app.get('/', (req: Request, res: Response) => {
    res.send('Servidor rodando...');
});
```

-   **Rota básica `/`**: Este é um exemplo de **rota HTTP GET**. Quando você acessa o servidor pela URL `http://localhost:3001`, ele retorna uma simples mensagem **'Servidor rodando...'** para indicar que o servidor está em funcionamento. Essa rota pode ser útil para testar se o servidor está ativo.

---

### 9. **Iniciando o Servidor**

```typescript
server.listen(3001, () => {
    console.log('Servidor rodando na porta 3001...');
});
```

-   **`server.listen(3001)`**: Aqui, o servidor começa a **escutar** na porta `3001` para **requisições HTTP e WebSocket**.
    -   O **callback** (`() => { console.log('Servidor rodando na porta 3001...') }`) exibe uma mensagem no console, confirmando que o servidor foi iniciado corretamente e está aguardando conexões.

---

### **Por que foi implementado dessa forma?**

1. **Socket.IO**: Utilizamos o Socket.IO porque ele oferece uma solução poderosa para comunicação bidirecional em tempo real entre o servidor e os clientes, sem a necessidade de fazer requisições repetidas do cliente (polling).

2. **Express e HTTP**: O Express serve como a base para o servidor web. Ele facilita a criação de APIs e rotas, e também serve como middleware para o Socket.IO. O HTTP é necessário para garantir que o servidor possa responder a requisições normais de navegador, como a rota `/`.

3. **CORS**: Habilitamos o CORS para permitir que o frontend, rodando em uma porta diferente (por exemplo, `http://localhost:3000`), possa se comunicar com o backend sem problemas de segurança entre diferentes origens.

4. **Conexões e Desconexões**: O servidor é configurado para registrar as conexões e desconexões dos clientes, permitindo um **controle e rastreamento** sobre os usuários conectados e garantindo que, se alguém sair, isso seja logado no servidor.

5. **Emissão de mensagens para todos os clientes**: O modelo de **emitir mensagens para todos os clientes** é adequado para um **chat em grupo**, onde a interação de todos é importante.

Essa estrutura é bastante eficiente para criar uma aplicação de chat em tempo real, garantindo que as mensagens sejam entregues instantaneamente a todos os clientes conectados.

# App.tsx

Esse código é uma implementação de um **cliente de chat em tempo real** utilizando **React** e **Socket.IO**, para interagir com o servidor que você mencionou anteriormente (o servidor rodando na porta `3001`). Vamos detalhar o que cada parte do código faz e por que foi implementada dessa forma.

### 1. **Importações**

```tsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
```

-   **`React`**: Importa a biblioteca **React** que permite criar interfaces de usuário baseadas em componentes.
-   **`useState`**: Um hook do React que permite adicionar estado a componentes funcionais. Nesse caso, ele é usado para armazenar a mensagem que o usuário está digitando e a lista de mensagens recebidas.
-   **`useEffect`**: Outro hook do React que permite **executar efeitos colaterais** (como chamadas a APIs, manipulação de DOM, e conexões WebSocket). No caso, ele é usado para configurar a conexão com o servidor via **Socket.IO**.

-   **`io`**: A função **`io`** é importada da biblioteca **`socket.io-client`**, que é usada para se conectar ao servidor Socket.IO. No caso, ela cria a conexão WebSocket com o servidor rodando na URL `http://localhost:3001`.

---

### 2. **Criação da Conexão Socket.IO**

```tsx
const socket = io('http://localhost:3001'); // Certifique-se de que a URL está correta
```

-   **`socket`**: Aqui, a função `io()` cria uma instância de **WebSocket** e a armazena na variável `socket`. Esse objeto `socket` é o canal de comunicação entre o **cliente** (a aplicação React) e o **servidor** (a API Socket.IO). Ele se conecta ao servidor **`http://localhost:3001`**, onde o servidor WebSocket está rodando.

---

### 3. **Definição dos Estados**

```tsx
const [message, setMessage] = useState('');
const [messages, setMessages] = useState<string[]>([]);
```

-   **`message`**: O estado `message` armazena o valor da **mensagem atual** que o usuário está digitando na caixa de texto.
-   **`setMessage`**: Função utilizada para atualizar o estado de `message`. Ela é chamada sempre que o valor do input de texto mudar.

-   **`messages`**: O estado `messages` é um **array** que armazena todas as mensagens enviadas e recebidas no chat. Esse array será exibido na interface para o usuário ver o histórico das mensagens.

-   **`setMessages`**: Função utilizada para atualizar o estado `messages`. Ela é chamada sempre que uma nova mensagem é recebida ou enviada, adicionando a nova mensagem ao histórico.

---

### 4. **Efeito `useEffect` para Configuração do Socket.IO**

```tsx
useEffect(() => {
    // Confirma a conexão com o servidor
    socket.on('connect', () => {
        console.log('Conectado ao servidor:', socket.id); // Log de conexão
    });

    socket.on('receive_message', (data: string) => {
        console.log('Mensagem recebida no cliente: ', data);
        setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
        socket.off('receive_message');
        socket.off('connect');
    };
}, []);
```

-   **`useEffect`**: O hook `useEffect` é utilizado aqui para configurar a **conexão com o servidor**. Ele é executado apenas uma vez quando o componente é montado, graças ao array de dependências `[]` (o efeito não será reexecutado em mudanças de estado ou props).

    -   **`socket.on('connect', callback)`**: Configura um ouvinte para o evento de conexão. Quando o cliente se conecta ao servidor WebSocket, a função de callback é chamada e imprime no console o **`socket.id`**. Isso ajuda a verificar se a conexão foi bem-sucedida.

    -   **`socket.on('receive_message', callback)`**: Esse ouvinte aguarda o evento **`receive_message`** emitido pelo servidor. Quando o servidor envia uma nova mensagem, ela é recebida como parâmetro e adicionada ao estado `messages`. A função **`setMessages`** é chamada para atualizar a lista de mensagens, fazendo com que a interface seja renderizada novamente com a nova mensagem.

    -   **`return () => { socket.off(...) }`**: A função de **limpeza** do `useEffect` é importante para **remover os ouvintes** quando o componente for desmontado. Isso impede que a aplicação tente ouvir eventos em um componente que não está mais presente, evitando vazamentos de memória.

---

### 5. **Função para Enviar Mensagens**

```tsx
const sendMessage = () => {
    if (message.trim()) {
        socket.emit('send_message', message); // Envia a mensagem ao servidor
        setMessages((prevMessages) => [...prevMessages, `Você: ${message}`]); // Adiciona a mensagem do próprio usuário
        setMessage('');
    }
};
```

-   **`sendMessage`**: Esta função é chamada quando o usuário clica no botão "Enviar" ou pressiona Enter (se for configurado dessa forma).

    -   **`if (message.trim())`**: Verifica se o valor da mensagem não é vazio ou composto apenas por espaços em branco. O método `trim()` remove os espaços antes e depois do texto.
    -   **`socket.emit('send_message', message)`**: O método `emit()` envia a mensagem do usuário para o servidor **via WebSocket**. O evento **`send_message`** é emitido, e o conteúdo da mensagem é enviado para o servidor para que este propague a mensagem para os outros clientes conectados.

    -   **`setMessages`**: Após enviar a mensagem, o estado `messages` é atualizado com a nova mensagem do próprio usuário. A nova mensagem é exibida na interface como "Você: [mensagem]", mostrando que foi o usuário quem enviou.

    -   **`setMessage('')`**: Limpa o campo de entrada de texto após a mensagem ser enviada.

---

### 6. **Interface do Usuário**

```tsx
return (
    <div>
        <h1>Chat em Tempo Real</h1>
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem"
            />
            <button onClick={sendMessage}>Enviar</button>
        </div>
        <div>
            <h2>Mensagens:</h2>
            {messages.map((msg, index) => (
                <p key={index}>{msg}</p>
            ))}
        </div>
    </div>
);
```

-   **Entrada de Texto (`input`)**: O campo de entrada de texto (`input`) onde o usuário digita a mensagem. O valor do campo é controlado pelo estado `message`, e o evento `onChange` é usado para atualizar o estado sempre que o usuário digitar algo.

-   **Botão "Enviar"**: O botão de envio chama a função `sendMessage` quando clicado.

-   **Exibição das Mensagens**: O `messages.map(...)` mapeia o array de mensagens armazenado no estado `messages` e exibe cada uma delas em um parágrafo (`<p>`). Isso cria o histórico de mensagens na interface do usuário.

---

### **Por que esse código foi implementado dessa forma?**

1. **Socket.IO**: A comunicação em tempo real é feita por meio do **Socket.IO**. O cliente se conecta ao servidor para ouvir e emitir eventos WebSocket, permitindo que a comunicação aconteça de forma rápida e eficiente, sem necessidade de recarregar a página.

2. **React com Hooks**: O React usa o **hook `useState`** para armazenar e atualizar os estados das mensagens e a mensagem digitada, e o **hook `useEffect`** para configurar e limpar a conexão com o servidor. Isso permite uma interação reativa e eficiente com a interface do usuário.

3. **Componentes Controlados**: O campo de texto é um **componente controlado**, ou seja, seu valor é gerido pelo estado React, tornando fácil sincronizar o valor digitado com o que será enviado ao servidor.

4. **Efeito de Limpeza**: O uso do `useEffect` para **remover ouvintes** quando o componente é desmontado é uma prática recomendada para evitar **vazamentos de memória**.

Essa estrutura de código permite que a aplicação seja altamente responsiva e interativa, com mensagens sendo enviadas e recebidas em tempo real entre o cliente e o servidor.
