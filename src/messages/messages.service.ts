import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  //in memory array to mock messages
  messages: Message[] = [{ name: 'HASSAN', text: 'Holaa!' }];
  create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    this.messages.push(message); //TODO improve this to check which user is using the app
    return message;
  }

  findAll() {
    return `This action returns all messages`;
  }
}
