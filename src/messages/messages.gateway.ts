import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io'; //import server to use it in the gateway

//disable  CORS
@WebSocketGateway({
  cors: {
    origin: '*',
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server; //as a reference to the Socket.io server
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto);
    this.server.emit('create', message); //send the message to all the clients
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  //join
  @SubscribeMessage('join')
  joinRoom() {
    // TODO: join room
  }
  //typing
  @SubscribeMessage('typing')
  async typing() {
    //TODO
  }
}
