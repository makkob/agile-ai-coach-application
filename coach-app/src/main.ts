import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, Socket } from 'socket.io';

import {onOpenAI} from "./service"

async function start() {
  const app = await NestFactory.create(AppModule);
  const server = app.getHttpServer();
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    },
  });
  const ioAdapter = new IoAdapter(io);
  app.useWebSocketAdapter(ioAdapter);

  // Додайте обробник події 'connection'
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id); 

    // Обробка події 'message' від клієнта
    socket.on('message',async (message: string) => {
      console.log('Received message from client:', message , "Socet id :" , socket.id);

      // const response =  await onOpenAI(message);
      // Обробка повідомлення і відправка відповіді клієнту
      const response = 'This is the response from the server ZAGLUSHKA';
      socket.emit('message', response);
    }); 

    // Обробка події відключення клієнта
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  await app.listen(5000);
  console.log('Server is running');
 
  
}

start();
