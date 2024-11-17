# Chat em Tempo Real

Este projeto implementa um **chat em tempo real** usando **React** no front-end e **Socket.IO** no back-end. O objetivo do projeto é permitir a comunicação instantânea entre os usuários através de mensagens enviadas e recebidas em tempo real.

## Funcionalidades

### Funcionalidades Implementadas até o momento

- **Conexão em Tempo Real**: O cliente se conecta ao servidor via WebSocket usando o **Socket.IO**, permitindo a troca de mensagens em tempo real.
  
- **Envio e Recebimento de Mensagens**: O usuário pode digitar uma mensagem e enviá-la ao servidor, que repassa a mensagem para todos os outros usuários conectados.

- **Exibição das Mensagens**: As mensagens enviadas são exibidas na interface, com a identificação de quem enviou a mensagem (por enquanto, "Você" para o próprio usuário).

- **Conexão e Desconexão**: O cliente se conecta ao servidor ao iniciar e é capaz de ver uma mensagem no console quando se conecta ou desconecta.

### Funcionalidades Adicionadas na Próxima Versão

#### 1. **Identificação de Usuário**
   - Implementar a funcionalidade de **login** e **identificação única** dos usuários para que cada um tenha um nome personalizado.
   - Exibir o nome de usuário ao invés de "Você" nas mensagens enviadas.

#### 2. **Mensagens Privadas**
   - Implementar a funcionalidade de **mensagens privadas**, permitindo que os usuários possam enviar mensagens específicas a outros usuários, além de mensagens em grupo.

#### 3. **Notificações de Nova Mensagem**
   - Adicionar **notificações** quando uma nova mensagem for recebida, mesmo se o usuário não estiver com a tela do chat aberta.

#### 4. **Armazenamento de Mensagens**
   - Persistir as mensagens no **back-end** (por exemplo, em um banco de dados), para que o histórico de mensagens seja mantido entre as conexões e não se perca quando o servidor for reiniciado.

#### 5. **Sistema de Emojis e Mídia**
   - Permitir o envio de **emojis**, **imagens** e **arquivos de mídia** (como fotos ou documentos) nas mensagens.

#### 6. **Design Responsivo**
   - Melhorar a interface para ser **responsiva**, garantindo que a aplicação funcione bem em dispositivos móveis e diferentes tamanhos de tela.

---

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface de usuário.
- **Socket.IO**: Biblioteca para comunicação em tempo real via WebSockets.
- **Node.js**: Ambiente de execução para o servidor WebSocket.
- **Express**: Framework para facilitar a criação de servidores em Node.js.

## Como Rodar o Projeto

### 1. Instalar as dependências

Clone o repositório:

```bash
git clone https://github.com/usuario/chat-em-tempo-real.git
```

Navegue para a pasta do projeto e instale as dependências:

```bash
cd chat-em-tempo-real
npm install
```

### 2. Rodar o servidor (Back-end)

No diretório do servidor, inicie o servidor:

```bash
npm run start:server
```

### 3. Rodar o cliente (Front-end)

No diretório do cliente, inicie o servidor de desenvolvimento:

```bash
npm run start:client
```

Isso abrirá o front-end no navegador, e você poderá começar a interagir com o chat em tempo real.

## Contribuições

Contribuições são bem-vindas! Se você tiver sugestões de melhorias ou correções de bugs, fique à vontade para **criar um pull request** ou **abrir uma issue**.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- Se você tiver dúvidas ou sugestões, entre em contato pelo e-mail: **leonardo.bernardo2658@gmail.com**.
- Estou disponivel também no Linkedin. Pode me encontrar clicando aqui ➡️ [link](https://www.linkedin.com/in/leonardo-bern/);
