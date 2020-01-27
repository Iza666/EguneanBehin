import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { AlertService } from 'src/app/services/alert.service';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: User;

  constructor(private authService: AuthService,
    private alertService: AlertService,private alertCtrl: AlertController) {}
  
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
    let alert = await this.alertCtrl.create({
      inputs: [
        {
          name: 'erabiltzailea',
          placeholder: 'Sartu erabiltzailea'
        },
        {
          name: 'email',
          placeholder: 'Sartu email-a'
        },
        {
          name: 'argazkia',
          placeholder: 'Sartu argazki bat'
        }
      ],
      buttons: [
        {
          text: 'Aldatu',
          handler: data => {
            this.datuakAldatu(data.erabiltzailea, data.email);
          }
        }
      ]
    });
   await alert.present();
  }
  datuakAldatu(erabiltzailea: string, email: string){
    console.log(erabiltzailea+', '+email);
  }
}
