import { Injectable } from '@nestjs/common';
import { User } from '../models/models';

@Injectable()
export class UserService {
 
  async createUserBySocketId(socketId: string): Promise<User> {
   
      try {
       

          const res = await User.create({
            socketId
          });

          return res
      } catch (error) {
          console.error(error);
         
      }
  }
  async getUserBySocketId (socketId: string): Promise<User> {
    try {
       

      const res = await User.findOne({
        where : {socketId}
      });

      return res
  } catch (error) {
      console.error(error);
     
  }
  }

 
}
