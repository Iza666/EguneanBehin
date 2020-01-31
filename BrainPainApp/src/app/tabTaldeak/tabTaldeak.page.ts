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
}
