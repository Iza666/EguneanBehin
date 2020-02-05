import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { Taldea } from 'src/app/modeloak/taldea';

import { AlertService } from 'src/app/services/alert.service';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { AlertController } from '@ionic/angular';
import { TaldeakService } from '../services/taldeak.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabTaldeak',
  templateUrl: 'tabTaldeak.page.html',
  styleUrls: ['tabTaldeak.page.scss']
})
export class TabTaldeakPage {
  user: User;
  processing:boolean;
  uploadImage: string;
  insertEginda : boolean;

  constructor(private authService: AuthService,
    private alertService: AlertService,private alertCtrl: AlertController, private taldeakService: TaldeakService, private router: Router) {}
  
  ngOnInit() {
    //hasieratik erabiltzailea kargatzeko
    if(this.authService.isLoggedIn == true && this.user == null){
      this.authService.user().subscribe(
        user => {
          this.user = user;
          console.log(user);
        }
      );
    }
    //erabiltzailearen taldeak kargatzen ditu
    this.taldeaLortu();
  }
  ngDoCheck() {
    
  }

  //taldea gehitzeko alert-a eratzen du eta datuak hartzen ditu
  async gehituTaldea(){
    let alerta = await this.alertCtrl.create({
      header: 'Sortu taldea',
      inputs: [
        {
          name: 'izena',
          placeholder: 'Sartu taldearen izena'
        }
      ],
      buttons: [
        {
          text: 'Listo!',
          handler: data => {
            this.taldeaSortu(data.izena);
          }
        }
      ]
    });
   await alerta.present();
  }
  //alert-ean sartutako datuak zerbitzura bidaltzen ditu
  taldeak : Taldea[] = [];
  taldeaSortu(izena: string){
    console.log("Metodoan nago");
    this.taldeakService.taldeaSortu(izena).subscribe(
      respuesta => {
        console.log(respuesta);
        this.taldeak = respuesta;
        this.alertService.presentToast("Taldea sortuta, eguneratzen...")
      });
  }
  //taldeak lortzen ditu kargatu baino lehen datuak eukitzeko
  taldeaLortu(){
    this.taldeakService.taldeaLortu().subscribe(
      respuesta => {
        this.taldeak = respuesta;
      });
  }
  //taldekideak lortzen ditu
  taldekideakLortu(taldeIzena : string){
    this.taldeakService.taldeIzena(taldeIzena);
    this.router.navigate(['/taldea']);
  }
  async tokenAlert(){
    let alerta = await this.alertCtrl.create({
      header: 'Sartu talde batera',
      inputs: [
        {
          name: 'token',
          placeholder: 'Sartu taldearen token-a'
        }
      ],
      buttons: [
        {
          text: 'Listo!',
          handler: data => {
            this.talderaSartu(data.token);
          }
        }
      ]
    });
   await alerta.present();
  }
  //token-aren bitartez taldera sartu ahal izateko
  talderaSartu(token: string){
    this.taldeakService.talderaSartu(token).subscribe(
      respuesta => {
        this.insertEginda = respuesta;
        console.log(this.insertEginda);
        if(this.insertEginda == true){
          this.alertService.presentToast("Eginda! Eguneratzen...")
          this.countdownRefresh(1);
        }
        else{
          this.alertService.presentToast("Ezin izan zara sartu, token-a ez da existitzen...")
        }
      });
  }
  //refreskatzeko timer-a
  countdownRefresh(seconds){
    var counter = seconds;
  
    var interval = setInterval(() => {
      console.log(counter);
      counter--;
      
  
      if(counter < 0 ){
        window.location.reload();
        clearInterval(interval);
        console.log('Ding!');
      };
    }, 1000);
  }
}
