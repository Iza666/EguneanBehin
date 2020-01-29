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
  processing:boolean;
  uploadImage: string;

  constructor(private authService: AuthService,
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
        );
        this.bueltak++;
      }
    }
  }

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
  datuakAldatu(erabiltzailea: string, email: string){
    console.log("Metodoan nago");
    this.erabiltzaileakService.profilaAldatu(erabiltzailea, email).subscribe(
      respuesta => {
        console.log(respuesta);
        window.location.reload();
        this.alertService.presentToast("Aldatuta, eguneratzen...")
      });
  }

  //FUNCION DE SUBIR LA IMAGEN
  presentActionSheet(fileLoader) {
    fileLoader.click();
    var that = this;
    fileLoader.onchange = function () {
      var file = fileLoader.files[0];
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        that.processing = true;
        that.getOrientation(fileLoader.files[0], function (orientation) {
          if (orientation > 1) {
            that.resetOrientation(reader.result, orientation, function (resetBase64Image) {
              that.uploadImage = resetBase64Image;
            });
          } else {
            this.uploadImage = reader.result;
          }
        });
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  getOrientation(file, callback) {
    var reader = new FileReader();
    reader.onload = function (e:any) {

      var view = new DataView(e.target.result);
      if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
      var length = view.byteLength, offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
          var little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
              return callback(view.getUint16(offset + (i * 12) + 8, little));
        }
        else if ((marker & 0xFF00) != 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file);
  }

  resetOrientation(srcBase64, srcOrientation, callback) {
    var img = new Image();

    img.onload = function () {
      var width = img.width,
        height = img.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");

      // set proper canvas dimensions before transform & export
      if (4 < srcOrientation && srcOrientation < 9) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      // transform context before drawing image
      switch (srcOrientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
        case 7: ctx.transform(0, -1, -1, 0, height, width); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
        default: break;
      }

      // draw image
      ctx.drawImage(img, 0, 0);

      // export base64
      callback(canvas.toDataURL());
    };

    img.src = srcBase64;
  }
  
}
