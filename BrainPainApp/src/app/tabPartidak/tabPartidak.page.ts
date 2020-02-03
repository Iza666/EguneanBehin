import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { AlertService } from 'src/app/services/alert.service';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { AlertController } from '@ionic/angular';
import { PartidakService } from '../services/partidak.service';
import { Partida } from './../modeloak/partida';


@Component({
  selector: 'app-tabPartidak',
  templateUrl: 'tabPartidak.page.html',
  styleUrls: ['tabPartidak.page.scss']
})
export class TabPartidakPage {
  user: User;
  processing:boolean;
  uploadImage: string;

  constructor(private authService: AuthService,
    private alertService: AlertService,private alertCtrl: AlertController, private partidakService: PartidakService) {}
  
  ngOnInit() {
    this.erabiltzaileaLortu();
  }
  
  //erabiltzaielaren partidak kargatzen ditu
  erabPartidak : Partida[] = [];
  async partidakLortu(){
    this.partidakService.partidakLortu().subscribe(
      respuesta => {
        this.erabPartidak = respuesta;
        console.log(this.erabPartidak);
    });
  }
  //erabiltzailearen objetua eratzen du
  erabiltzaileaLortu(){
    if(this.authService.isLoggedIn == true && this.user == null){
      this.authService.user().subscribe(
        user => {
          this.user = user;
        });
        console.log(this.user);
        this.partidakLortu();
    }
  }
}
