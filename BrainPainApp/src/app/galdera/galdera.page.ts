import { Component, OnInit } from '@angular/core';
import { DenaService } from './../services/dena.service';
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

  constructor(private DenaService : DenaService,
    private authService: AuthService, private http: HttpClient,private router: Router, private galderakService : GalderakService
    ) { }

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
      this.galderakService.bidaliAmaitutakoPartida(this.puntuak, this.user);      this.router.navigateByUrl('');
    }
  }
  bidaliGalderak(a: number){
    this.puntuak = this.galderakService.bidaliGalderak(a, this.galderak, this.user)
  }    
}
