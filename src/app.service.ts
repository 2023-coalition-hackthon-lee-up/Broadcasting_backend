import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getPlayList(id: string) {
    console.log('getPlayList');
    const { YOUTUBE_KEY } = process.env;
    const playlistId =
      id == '1' ? process.env.PLAYLIST_ID : process.env.PLAYLIST2_ID;

    // 1. youtube playlist를 가져온다.
    let part = 'id, snippet, contentDetails, status';
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&maxResults=6&playlistId=${playlistId}&key=${YOUTUBE_KEY}`,
    );
    const playlist = res.data.items;
    part = 'contentDetails';
    let videoId = '';
    playlist.forEach((element) => {
      videoId += `${element.snippet.resourceId.videoId},`;
    });
    const Videores = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_KEY}&part=contentDetails`,
    );
    const metaList = Videores.data.items;

    return { playlist, metaList };
  }
}
