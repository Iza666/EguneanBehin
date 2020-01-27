import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { AlertService } from 'src/app/services/alert.service';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { AlertController } from '@ionic/angular';
import { ErabiltzaileakService } from '../services/erabiltzaileak.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: User;

  constructor(private authService: AuthService,
    private alertService: AlertService,private alertCtrl: AlertController, private erabiltzaileakService: ErabiltzaileakService) {}
  
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

  async aldatuizena(){
    if(this.user.argazkia == "0"){
      this.user.argazkia ="";
    }
    let alerta = await this.alertCtrl.create({
      header: 'Aldatu datuak',
      inputs: [
        {
          name: 'erabiltzailea',
          value: this.user.erabiltzailea,
          placeholder: 'Sartu erabiltzailea'
        },
        {
          name: 'email',
          value: this.user.email,
          placeholder: 'Sartu email-a'
        },
        {
          name: 'argazkia',
          value: this.user.argazkia,
          placeholder: 'Sartu argazki bat'
        }
      ],
      buttons: [
        {
          text: 'Ezeztatu',
          handler: data => {
            alert("ezeztatu");
          }
        },
        {
          text: 'ALDATU',
          handler: data => {
            this.datuakAldatu(data.erabiltzailea, data.email, data.argazkia);
          }
        }
      ]
    });
   await alerta.present();
  }
  datuakAldatu(erabiltzailea: string, email: string, argazkia: string){
    console.log("Metodoan nago");
    this.erabiltzaileakService.profilaAldatu(erabiltzailea, email, argazkia);
  }
}
