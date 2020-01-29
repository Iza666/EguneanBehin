import { Component, OnInit } from '@angular/core';
import { SailkapenaService } from '../services/sailkapena.service';
import { Sailkapena } from './../modeloak/sailkapena';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  user: User;
  sailkapena: Sailkapena[];
  zu: Sailkapena;
  zurePosizioa: number = 0;
  zurePuntuak: number = 0;
  id = 0;
  deituta: boolean = false;

  constructor(private authService: AuthService, private SailkapenaService : SailkapenaService) {}
  
  ngOnInit() {
    this.SailkapenaService.getZurePuntuak()
    .subscribe(data => {this.zurePuntuak = data[0].Totala},
      error=> console.log("Error ::"+ error)).add(() => { 
        this.nullToZero(); //Bukatzean Azpiko funtziora bidaltzen du
      });
  }  
  nullToZero(){
    if(this.zurePuntuak == null){
      this.zurePuntuak = 0;
    }
  }
  ngDoCheck() {
    if(this.authService.isLoggedIn == true && this.user == null){
      this.authService.user().subscribe(
        user => {
          this.user = user;
          console.log(user);
        }
      ).add(() => { 
        this.getSailkapena(true); //Bukatzean Azpiko funtziora bidaltzen du
      });
    }
    else{
      if(!this.deituta)
      {
        this.deituta = true;
        this.getSailkapena(false); //Erabiltzailea ez badago logeatuta
      }
    }
  }
  //sailkapena bueltatzen duen metodoa
  getSailkapena(logeatuta): void{
    this.SailkapenaService.getSailkapena()
    .subscribe(data => {this.sailkapena = data},
      error=> console.log("Error ::"+ error))
      .add(() => {
        if(logeatuta){
          this.getZurePostua(); //Bukatzean Azpiko funtziora bidaltzen du
        }
      });
  }
  //erabiltzailearen postua buelatzen du
  getZurePostua(){
    this.zu = this.sailkapena.find( ({ erabiltzailea }) => erabiltzailea === this.user.erabiltzailea);
    if(this.zu != undefined)
    {
      this.zurePosizioa = this.sailkapena.findIndex( ({ id_erabiltzailea }) => id_erabiltzailea === this.zu.id_erabiltzailea) + 1;
    }
  }
}
