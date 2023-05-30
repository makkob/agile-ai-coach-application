import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, message: string): void {
    // Опрацьовуємо повідомлення від клієнта
    console.log('Received message:', message);

    // Надсилаємо відповідь назад клієнту
    const response = 'This is the server response';
    this.server.to(client.id).emit('response', response);
  }
}
