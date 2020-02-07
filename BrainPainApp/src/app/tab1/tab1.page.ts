import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { AlertService } from 'src/app/services/alert.service';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { GalderakService } from '../services/galderak.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private authService: AuthService,
              private alertService: AlertService, private navController: NavController,
              private http: HttpClient, private galderakService : GalderakService, private router : Router
    ) { }
  user: User;
  jokatuta: boolean = true;
  jokatutaChecked: boolean = false;

  ngOnInit() {

  }
  bueltak : number = 2;
  ngDoCheck() {
    if(this.bueltak !=0 ){
      if(this.authService.isLoggedIn == true && this.user == null){
        var a = document.getElementById("buttons");
        this.authService.user().subscribe(
          user => {
            this.user = user;
            a.style.display="none";
          });
          console.log(this.user);
        if(!this.jokatutaChecked){
          this.checkJokatuta();
        }
        this.bueltak--;
      }
    }
  }
  //erabiltzaileak partida bat jokatu duen komprobatzen du
  checkJokatuta(){
      this.jokatutaChecked = true;
      this.galderakService.checkJokatutaService().subscribe(data => {this.jokatuta = data}, error => console.log("Error ::"+ error));
      console.log(this.jokatuta);
    }
  //jolastu botoiari ematerakoan partida bat sortuko du
  partidaSortu(){
    this.galderakService.partidaSortu();
  }
  //arauak botoiari klik egiterakoan agertzen den alerta
  showAlert(){
    const alert = document.createElement('ion-alert');
    alert.header = 'Instrukzioak';
    alert.message = 'Egunean behin soilik jolastu ahalko duzu. Partida bakoitzean 10 galdera erantzun beharko dituzu, ahalik eta denbora gutxienean. Ondo pasatu pasatu gabe!';
    alert.buttons = ['Ederto'];

    document.body.appendChild(alert);
    return alert.present();
  }
  //logout egiterakoan agertzen den alerta
  showLogoutAlert(){
    const alert = document.createElement('ion-alert');
    alert.header = 'Logout';
    alert.message = 'Logout egin nahi ahal duzu?';
    alert.buttons = ['Bai', 'Ez'];

    document.body.appendChild(alert);
    return alert.present();
  }
}
