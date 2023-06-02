  

import{Module} from "@nestjs/common"
import { AppController } from "./app.controller";
import { SocketGateway } from './socket.gateway';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [
        SequelizeModule.forRoot({
          dialect: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'your-username',
          password: 'your-password',
          database: 'your-database',
          autoLoadModels: true,
          synchronize: true,
        }),
    ],
    controllers:[AppController],
    providers: [SocketGateway]
})

export class AppModule{}       