import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  //in memory array to mock messages
  messages: Message[] = [{ name: 'HASSAN', text: 'Holaa!' }];
  clientToUser = {}; //map to store the client id and the user name

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
    };
    this.messages.push(message); //TODO improve this to check which user is using the app
    return message;
  }

  findAll() {
    return this.messages;
  }
}
