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

  constructor(private authService: AuthService, private SailkapenaService : SailkapenaService) {}

  /* onViewDidLoad(){
    this.ngOnInit();
  } */
  ngOnInit() {
    if(this.authService.isLoggedIn == true)
    {
      this.authService.user().subscribe(
        user => {
          this.user = user;
        }
      ).add(() => {
        this.getSailkapena(true);
      });
    }
    else{
      this.getSailkapena(false);
    }
  }
  //sailkapena bueltatzen duen metodoa
  getSailkapena(logeatuta): void{
    this.SailkapenaService.getSailkapena()
    .subscribe(data => {this.sailkapena = data},
      error=> console.log("Error ::"+ error))
      .add(() => {
        if(logeatuta)
          this.getZurePostua();
      });
  }
  //erabiltzailearen postua buelatzen du
  getZurePostua(){
    this.SailkapenaService.getZurePuntuak()
    .subscribe(data => {this.zurePuntuak = data[0].Totala},
      error=> console.log("Error ::"+ error))
      .add(() => {
        this.nullToZero();
      });
    this.zu = this.sailkapena.find( ({ erabiltzailea }) => erabiltzailea === this.user.erabiltzailea);
    if(this.zu != undefined)
    {
      this.zurePosizioa = this.sailkapena.findIndex( ({ id_erabiltzailea }) => id_erabiltzailea === this.zu.id_erabiltzailea) + 1;
    }
  }
  nullToZero(){
    if(this.zurePuntuak == null){
      this.zurePuntuak = 0;
    }
  }
}
