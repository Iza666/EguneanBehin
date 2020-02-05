import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { AlertService } from 'src/app/services/alert.service';
import { AlertController } from '@ionic/angular';
import { ErabiltzaileakService } from '../services/erabiltzaileak.service';
import { GalderakService } from '../services/galderak.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: User;
  processing:boolean;

  constructor(private galderakService: GalderakService, private authService: AuthService,
    private alertService: AlertService,private alertCtrl: AlertController, private erabiltzaileakService: ErabiltzaileakService) {}
  
  ngOnInit() {
    
  }

  bueltak : number = 0;
  ngDoCheck() {
    if(this.bueltak!=4){
      if(this.authService.isLoggedIn == true && this.user == null){
        this.authService.user().subscribe(
          user => {
            this.user = user;
            console.log(user);
            
          }
        ).add(() => {
          var argazkia = document.getElementById("avatarArgazkia") as HTMLImageElement;
          argazkia.src = this.user.argazkia;
        });
        this.bueltak++;
      }
    }
  }
  //datuak aldatzeko agertzen den alert-a
  async aldatuizena(){
    if(this.user.argazkia == "a"){
      this.user.argazkia ="";
    }
    let alerta = await this.alertCtrl.create({
      header: 'Aldatu datuak',
      inputs: [
        {
          name: 'erabiltzailea',
          value: this.user.erabiltzailea,
          placeholder: 'Sartu erabiltzailea'
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
            this.datuakAldatu(data.erabiltzailea);
          }
        }
      ]
    });
   await alerta.present();
  }
  //datuak aldatzen dituen metodoa, sartutako datuak zerbitzura bidaltzen ditu
  datuakAldatu(erabiltzailea: string){
    this.erabiltzaileakService.profilaAldatu(erabiltzailea).subscribe(
      respuesta => {
        console.log(respuesta);
        window.location.reload();
        this.alertService.presentToast("Aldatuta, eguneratzen...")
      });
  }
  //irudia igotzeko metodoa
  irudiaIgo(event) : void {
    var f = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e){
        var argazkia: string;
        var extension = f.type.split('/')[1];
        
        var binaryData = e.target.result;
        var base64String = window.btoa(binaryData);
        
        if(extension == "png"){
          argazkia = "data:image/png;base64,"+base64String;
        }
        else if(extension == "jpeg"){
          argazkia = "data:image/jpeg;base64,"+base64String;
        }
        else if(extension == "jpg"){
          argazkia = "data:image/jpg;base64,"+base64String;
        }
        else if(extension == "gif"){
          argazkia = "data:image/gif;base64,"+base64String;
        }
        else{
          this.showAlert();
        }
          
        this.erabiltzaileakService.argazkiaIgo(argazkia).subscribe(
          respuesta => {
            console.log(respuesta);
            window.location.reload();
          });
      };
    })(f).bind(this);
    reader.readAsBinaryString(f);
  }
  //igotako artxiboa irudi bat ez bada agertzen den metodoa
  showAlert(){
    const alert = document.createElement('ion-alert');
    alert.header = 'Artxiboa ez da irudia!';
    alert.message = 'Aukeratu irudi bat mesedez.';
    alert.buttons = ['Ados'];

    document.body.appendChild(alert);
    return alert.present();
  }
}
