import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: User;

  constructor(private authService: AuthService,
    private alertService: AlertService) {}
  
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
}
