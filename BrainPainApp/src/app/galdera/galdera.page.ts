import { Component, OnInit } from '@angular/core';
import { SailkapenaService } from '../services/sailkapena.service';
import { Galdera } from './../modeloak/galdera';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { animationFrameScheduler } from 'rxjs';
import { Router } from '@angular/router'
import {GalderakService} from '../services/galderak.service';

@Component({
  selector: 'app-galdera',
  templateUrl: './galdera.page.html',
  styleUrls: ['./galdera.page.scss'],
})
export class GalderaPage implements OnInit {
  public timer = 0;
  constructor(private SailkapenaService : SailkapenaService,
    private authService: AuthService, private http: HttpClient,private router: Router, private galderakService : GalderakService){
      this.startTimer();
    }

  id = 0;
  ngOnInit() {
    this.getGalderak();
  }
  galderak : Galdera[];
  user: User;
  puntuak : number = 0;


  //Galderak lortzeko metodoa
  getGalderak(): Galdera[]{
    this.galderakService.getGalderak()
    .subscribe(data => {this.galderak = data},
       error=> console.log("Error ::"+ error));
       return this.galderak;
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
        console.log(user); 
      }
    );
  }
   count : number = 0;
  hurrengoa(){
    if(this.count!=10){
      this.getGalderak();
      this.count++;
      alert(this.count);
    }
    else{
      alert("Partida amaitu da, dena gordetzen...");
      alert(this.puntuak);
      this.galderakService.bidaliAmaitutakoPartida(this.puntuak, this.user, this.minutes, this.seconds);      this.router.navigateByUrl('');
    }
  }
  bidaliGalderak(a: number){
    this.puntuak = this.galderakService.bidaliGalderak(a, this.galderak, this.user);
    this.hurrengoa();
  }

  seconds : number = 0;
  minutes : number = 0;

startTimer(){
    setInterval(function(){
      if(this.timer < 10 && this.timer != 0){
        this.seconds = "0"+ this.timer;
        ++this.timer;
      }

      else if(this.timer != 60){
        this.seconds = this.timer++;
      }
      else{
        this.timer = 0;
        this.seconds = 0;
        ++this.minutes;
        ++this.timer;
      }
    }.bind(this), 1000)
  }
}
