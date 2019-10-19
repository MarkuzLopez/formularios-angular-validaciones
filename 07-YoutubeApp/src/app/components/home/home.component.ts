import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  videos: any[] = [];
  videoSele: any;
  constructor(private youtubeService: YoutubeService) { }

  ngOnInit() {
    this.youtubeService.getVideos().subscribe((resp: any) => {
       this.videos = resp;
    });
  }

  verVideo(video: any) {
    this.videoSele = video;
    $('#exampleModal').modal();
  }

  cerrarModal() {
    this.videoSele = null;
    $('#exampleModal').modal('hide');
  }

  cargarMas() {
    this.youtubeService.getVideos().subscribe((videos: any) =>  {
      this.videos.push.apply(this.videos, videos);
    });
  }

}
