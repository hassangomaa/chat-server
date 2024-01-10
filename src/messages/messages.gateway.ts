import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io'; //import server to use it in the gateway

//disable  CORS
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server; //as a reference to the Socket.io server
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messagesService.create(
      createMessageDto,
      client.id,
    );
    //send the message to all the clients that are connected to the server +even+ the one that sent the message
    this.server.emit('create', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  //join
  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string, //extract the name from the message body
    @ConnectedSocket() client: Socket, //get the client socket Info
  ) {
    return this.messagesService.identify(name, client.id);
  }
  //typing
  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket, //get
  ) {
    //signal when start typing messages and signal when stop typing

    const name = this.messagesService.getClientName(client.id);
    //broadcast to all the clients that are connected to the server except the one that sent the message
    client.broadcast.emit('typing', { name, isTyping });
  }
}
