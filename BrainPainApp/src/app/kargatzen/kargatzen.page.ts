import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-kargatzen',
  templateUrl: './kargatzen.page.html',
  styleUrls: ['./kargatzen.page.scss'],
})
export class KargatzenPage implements OnInit {
  entered=false;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    if(this.entered)
    {
      this.router.navigate(['/tabs/tab1']);
    }
    else{
      this.entered = true;
      timer(3000).subscribe( x =>{
        this.router.navigate(['/galdera']);
      });
    }
  }
}
