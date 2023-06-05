import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, Socket } from 'socket.io';
import { Sequelize } from 'sequelize-typescript';
import { sequelizeConfig } from './sequelize.config';
import { User,  Message} from './models/models';
import { UserService } from './service/user.service';
import { DialogService } from './service/dialog.service';

import { onOpenAI } from './service/openAI.service';

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

  const userService = app.get(UserService); 
  const dialogService = app.get(DialogService); 

  io.on('connection', async (socket: Socket) => {
    console.log('Client connected:', socket.id);

    userService.createUserBySocketId(socket.id); 

    socket.on('message', async (message: string) => {
      console.log('Received message from client:', message, 'Socet id :', socket.id);
      const userId = await (await userService.getUserBySocketId(socket.id)).dataValues.id;
      
      dialogService.saveMessageToDB(message, "Client", userId, "request");
      const response =  await onOpenAI(message);

      socket.emit('message', response);
      dialogService.saveMessageToDB(response, "CoachAI", userId, "response");
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });


  const sequelize = new Sequelize(sequelizeConfig);
  sequelize.addModels([User, Message]);

  await sequelize.authenticate();
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log('Database synchronized');
    })
    .catch((error) => {
      console.error('Error synchronizing database:', error);
    });

  await app.listen(5000);
  console.log('Server is running');
}

start();