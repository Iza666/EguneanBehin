import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { AlertService } from 'src/app/services/alert.service';
import { Platform, NavController } from '@ionic/angular';
import { LoginPage } from '../auth/login/login.page';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  constructor(private authService: AuthService,
              private alertService: AlertService, private navController: NavController,
              private http: HttpClient
            
    ) { 
      
    
  }
  user: User;

  ngOnInit() {
  }
  ngDoCheck() {
        if(this.authService.isLoggedIn == true && this.user == null){
          this.authService.user().subscribe(
            user => {
              this.user = user;
              });
              console.log(this.user);
          //botoiak
          var a = document.getElementById("buttons");
          a.style.display="none";
          /* var profila = document.getElementById("profila");
          profila.removeAttribute("disabled"); */
        }
      }
  partidaSortu(){
    var dt = new Date();
    var d = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    let datuak = {"id":0,"id_erabiltzailea" : this.user.id, "data": d, "puntuak" : 0, "zenbat_zuzen": 0,"zenbat_denbora" : 0};
      let options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      var url = "http://localhost:8000/api/insertMatch";
      new Promise(resolve => {
        this.http.post(url,JSON.stringify(datuak),options)
            .subscribe(data => {
              resolve(data)
            })
          });
      document.getElementById("galdera").style.display="none";
  }
  
  showAlert(){
    const alert = document.createElement('ion-alert');
    alert.header = 'Arauak';
    alert.message = 'Ondo pasatu pasatu gabe!';
    alert.buttons = ['Ederto'];

    document.body.appendChild(alert);
    return alert.present();
  }
  showLogoutAlert(){
    const alert = document.createElement('ion-alert');
    alert.header = 'Logout';
    alert.message = 'Logout egin nahi ahal duzu?';
    alert.buttons = ['Bai', 'Ez'];

    document.body.appendChild(alert);
    return alert.present();
  }

}