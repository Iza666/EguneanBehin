import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { AlertService } from 'src/app/services/alert.service';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { AlertController } from '@ionic/angular';
import { TaldeakService } from '../services/taldeak.service';
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
    private alertService: AlertService,private alertCtrl: AlertController, private taldeakService: TaldeakService) {}
  
  ngOnInit() {
    
  }
  ngDoCheck() {
    if(this.authService.isLoggedIn == true && this.user == null){
      this.authService.user().subscribe(
        user => {
          this.user = user;
          console.log(user);
        }
      );
    }
  }

  async gehituTaldea(){
    let alerta = await this.alertCtrl.create({
      header: 'Sortu taldea',
      inputs: [
        {
          name: 'izena',
          placeholder: 'Sartu taldearen izena'
        },
        {
          name: 'partaide1',
          placeholder: 'Sartu partaidea'
        }
        ,
        {
          name: 'partaide2',
          placeholder: 'Sartu partaidea'
        }
        ,
        {
          name: 'partaide3',
          placeholder: 'Sartu partaidea'
        }
        ,
        {
          name: 'partaide4',
          placeholder: 'Sartu partaidea'
        }
        ,
        {
          name: 'partaide5',
          placeholder: 'Sartu partaidea'
        }
      ],
      buttons: [
        {
          text: 'Listo!',
          handler: data => {
            this.taldeaSortu(data.izena, data.partaide1, data.partaide2, data.partaide3, data.partaide4, data.partaide5);
          }
        }
      ]
    });
   await alerta.present();
  }
  taldeaSortu(izena: string, partaide1: string, partaide2: string, partaide3: string, partaide4: string, partaide5: string){
    console.log("Metodoan nago");
    this.taldeakService.taldeaSortu(izena, partaide1, partaide2, partaide3, partaide4, partaide5).subscribe(
      respuesta => {
        console.log(respuesta);
        window.location.reload();
        this.alertService.presentToast("Taldea sortuta, eguneratzen...")
      });
  }
}
