  

import{Module} from "@nestjs/common"
import { AppController } from "./app.controller";
import { SocketGateway } from './socket.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from 'dotenv';
config();

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadModels: true,
            synchronize: true,
          }),
          
          
    ],
    controllers:[AppController],
    providers: [SocketGateway]
})

export class AppModule{}       