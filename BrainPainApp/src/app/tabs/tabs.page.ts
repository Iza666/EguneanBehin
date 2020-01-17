import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../modeloak/user';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
user:User;
  constructor(private authService: AuthService) {}

  ngOnInit(){
  }
  ngAfterViewInit(){
    /* if(this.authService.isLoggedIn == true && this.user == null){
      alert("entro");
      this.authService.user().subscribe(
        user => {
          this.user = user;
          });
          var profila = document.getElementById("profila");
          profila.removeAttribute("disabled");
      //disable  
    }
  }*/
  
}
}
