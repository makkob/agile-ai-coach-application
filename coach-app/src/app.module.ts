  

import{Module} from "@nestjs/common"

import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './service/user.service';
import { DialogService } from './service/dialog.service';
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
   
    providers: [UserService,
         DialogService,
       
        ]
})

export class AppModule{}       