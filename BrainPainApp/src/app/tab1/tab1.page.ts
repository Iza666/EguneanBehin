import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  user: User;
  constructor(private authService: AuthService,
              private alertService: AlertService
    ) { 
    
  }
  ngOnInit() {
    
  }
  ionViewWillEnter() {

    this.authService.user().subscribe(
      user => {
        this.user = user;
        console.log(user);
      }
    );
  }
  showAlert(){
    const alert = document.createElement('ion-alert');
    alert.header = 'Arauak';
    alert.message = 'Ondo pasatu pasatu gabe!';
    alert.buttons = ['Ederto'];

    document.body.appendChild(alert);
    return alert.present();
  }

}