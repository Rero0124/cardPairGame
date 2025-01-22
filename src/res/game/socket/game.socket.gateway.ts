import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  namespace: 'game',
})
export class GameSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GameSocketGateway');

  connectedClients: { [socketId: string]: boolean } = {};
  clientName: { [socketId: string]: string } = {};
  roomUsers: { [key: string]: string[] } = {};

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): WsResponse<string> {
    this.server.emit('events', data);
    this.logger.log(data);
    return { event: 'events', data };
  }

  afterInit(server: Server) {
    this.logger.log('웹소켓 Game 초기화 ✅');
  }

  handleConnection(client: Socket, ...args: any[]) {
    if(this.connectedClients[client.id]) {
      client.disconnect(true);
      return;
    }

    this.connectedClients[client.id] = true;
  }

  handleDisconnect(client: Socket) {
    delete this.connectedClients[client.id];
  }
}