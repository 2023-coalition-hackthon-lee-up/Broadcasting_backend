import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import axios from 'axios';
import { Server, Socket } from 'socket.io';

// 이 설정들이 뭘하는건지, 애초에 무슨 레포를 보고 이것들을 찾을 수 있는지 전혀 모르겠다.
@WebSocketGateway(8000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  // @SubscribeMessage('playlist')
  // async handleEvent(@ConnectedSocket() socket: Socket) {
  //   const { playlistId, YOUTUBE_KEY } = process.env;

  //   // 1. youtube playlist를 가져온다.
  //   let part = 'id, snippet, contentDetails, status',
  //     videoId = '';
  //   const res = await axios.get(
  //     `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&maxResults=6&playlistId=${playlistId}&key=${YOUTUBE_KEY}`,
  //   );
  //   const playlist = res.data.items;

  //   part = 'contentDetails';
  //   playlist.forEach((element) => {
  //     videoId += `${element.snippet.resourceId.videoId},`;
  //   });
  //   const Videores = await axios.get(
  //     `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_KEY}&part=contentDetails`,
  //   );
  //   // 2. playlist를 client에 전달한다.
  //   // 왜인지 모르겠지만 Videores를 직접 전달하면 함수최대스택을 초과해 터져버린다.
  //   const metaList = Videores.data.items;
  //   socket.emit('playlist', playlist, metaList);
  // }

  afterInit() {
    this.server.on('welcome', (room) => {
      console.log('welcome event');
    });
    console.log('afterInit');
  }

  // 소켓이 연결되면 실행
  async handleConnection(@ConnectedSocket() socket: Socket) {
    const { PLAYLIST_ID, YOUTUBE_KEY } = process.env;

    // 1. youtube playlist를 가져온다.
    let part = 'id, snippet, contentDetails, status';

    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&maxResults=6&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_KEY}`,
    );
    const playlist = res.data.items;

    part = 'contentDetails';
    let videoId = '';
    playlist.forEach((element) => {
      videoId += `${element.snippet.resourceId.videoId},`;
    });
    //console.log('videoIdList: ', videoId);
    const Videores = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_KEY}&part=contentDetails`,
    );
    // 2. playlist를 client에 전달한다.
    // 왜인지 모르겠지만 Videores를 직접 전달하면 함수최대스택을 초과해 터져버린다.
    const metaList = Videores.data.items;
    socket.emit('playlist', playlist, metaList);
  }

  // 소켓 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('handleDisconnect');
  }
}
