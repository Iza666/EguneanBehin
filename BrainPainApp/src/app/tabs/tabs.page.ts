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

}
