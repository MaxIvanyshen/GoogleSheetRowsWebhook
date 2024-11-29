import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['*'],
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() socket: Socket): string {
    console.log('Received message:', data);
    socket.broadcast.emit('message', data); 
    return data;
  }

  sendMessageToClients(message: string): void {
    console.log('Sending message to all clients:', message);
    this.server.emit('message', message); 
  }
}

