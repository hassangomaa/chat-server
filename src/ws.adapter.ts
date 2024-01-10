import { IoAdapter } from '@nestjs/platform-socket.io';
import * as http from 'http';
import * as io from 'socket.io';

export class WsAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = http.createServer();
    const socketIo = new io.Server(server, options);

    return socketIo;
  }
}
