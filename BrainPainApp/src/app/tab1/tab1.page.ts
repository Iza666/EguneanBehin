import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { AlertService } from 'src/app/services/alert.service';
import { Platform, NavController } from '@ionic/angular';
import { LoginPage } from '../auth/login/login.page';
import { HttpClient } from '@angular/common/http';
import {GalderakService} from '../services/galderak.service';
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

  ngOnInit() {
    if(this.authService.isLoggedIn == true && this.user == null){
      this.authService.user().subscribe(
        user => {
          this.user = user;
          });
          console.log(this.user);
      //botoiak
      var a = document.getElementById("buttons");
      a.style.display="none";
    }
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
    }
  }
  partidaSortu(){
    this.galderakService.partidaSortu();
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
  logout(){
    this.authService.storage.remove('token');
    this.router.navigateByUrl('/tabs/tab1');
    location.reload;
  }

}