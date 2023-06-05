import { Injectable } from '@nestjs/common';
import { Message } from '../models/models';

@Injectable()
export class DialogService {
 
  async saveMessageToDB(message: string , author: string , userId: number , type: string): Promise<Message> {
   
      try {
       

          const res = await Message.create({
            message , author , userId , type
          });
          return res
      } catch (error) {
          console.error(error);
         
      }
  }
  

 
}
