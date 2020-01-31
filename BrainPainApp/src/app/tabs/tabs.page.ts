import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../modeloak/user';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private authService: AuthService) {}
  logged: boolean = false;
  done: boolean = false;

  ngDoCheck() {
    if(!this.done){
      this.logged = this.authService.isLoggedIn;
      if(this.logged == true){
        this.done = true;
      }
    }

      
    /* if(this.bueltak !=0){
      if(this.authService.isLoggedIn == true && this.user == null){
        this.authService.user().subscribe(
          user => {
            this.user = user;
          });
        this.bueltak--;
      }
    } */
  }
}

