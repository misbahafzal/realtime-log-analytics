import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LogsGateway {
  @WebSocketServer()
  server: Server;

  emitLog(log: any) {
    this.server.emit('log', log);
  }
}
