import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  youtubeUrl: string = 'https://www.googleapis.com/youtube/v3';
  apiKey: string = 'AIzaSyCVfgsuaB3YXTh5UfMqdFW8wgsISAYbpd0';
  playList: string = 'UU478tfHDlHzZ0KJvII4Hj7g';
  private nextPageToken: string = '';

  constructor(private http: HttpClient) { }

  getVideos() {
     let url = `${this.youtubeUrl}/playlistItems`;

     let params = new HttpParams();
     params = params.append('part', 'snippet');
     params = params.append('maxResults', '10');
     params = params.append('playlistId', this.playList);
     params = params.append('key', this.apiKey);

     if (this.nextPageToken) {
        params.set('pageToken', this.nextPageToken);
     }

     return this.http.get(url, {params}).pipe( map((resp: any) => {
      this.nextPageToken = resp.nextPageToken;
      let videos: any [] = [];
      resp.items.forEach(element => {
        let snnipet = element.snippet;
        videos.push(snnipet);
        // console.log(videos);
      });
      return videos;
     }));
  }
}
