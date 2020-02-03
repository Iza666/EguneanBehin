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
  base64Image: String;
  file: File;
  myimage: File;
  imagena: string;
 

  constructor(private galderakService: GalderakService, private authService: AuthService,
    private alertService: AlertService,private alertCtrl: AlertController, private erabiltzaileakService: ErabiltzaileakService) {}
  
  ngOnInit() {
    
  }
  /* changeListener($event) : void {
    this.file = $event.target.files[0];
    console.log(this.file);
    var base64String = window.btoa(this.file);
  } */

  changeListener(event) : void {
    var f = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e)           {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
        //showing file converted to base64
        this.imagena = base64String;
        this.galderakService.hireamama(base64String);
        console.log('File converted to base64 successfuly!');
      };
    })(f).bind(this);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(f);
  }

  saveProfile_click() {
    console.log("saveProfile_click");

    // Add your code here
    /* this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object('profile/${this.uid}').set(this.profile)
        .then(() => {
          //this.uploadProfileImage();
          this.navCtrl.pop();
        });
    }) */
  }

  /* uploadProfileImage(){
    console.log("uploadProfileImage");
    let fileRef = firebase.storage().ref('profileImages/' + this.uid + ".jpg");
    fileRef.put(this.file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  } */

  bueltak : number = 0;
  ngDoCheck() {
    if(this.bueltak!=4){
      if(this.authService.isLoggedIn == true && this.user == null){
        this.authService.user().subscribe(
          user => {
            this.user = user;
            console.log(user);
          }
        );
        this.bueltak++;
      }
    }
  }
  //datuak aldatzeko agertzen den alert-a
  async aldatuizena(){
    console.log(this.imagena);
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
        },
        {
          name: 'email',
          value: this.user.email,
          placeholder: 'Sartu email-a'
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
            this.datuakAldatu(data.erabiltzailea, data.email);
          }
        }
      ]
    });
   await alerta.present();
  }
  //datuak aldatzen dituen metodoa, sartutako datuak zerbitzura bidaltzen ditu
  datuakAldatu(erabiltzailea: string, email: string){
    console.log("Metodoan nago");
    this.erabiltzaileakService.profilaAldatu(erabiltzailea, email).subscribe(
      respuesta => {
        console.log(respuesta);
        window.location.reload();
        this.alertService.presentToast("Aldatuta, eguneratzen...")
      });
  }

  
}
