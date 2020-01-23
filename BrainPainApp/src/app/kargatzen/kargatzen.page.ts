import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-kargatzen',
  templateUrl: './kargatzen.page.html',
  styleUrls: ['./kargatzen.page.scss'],
})
export class KargatzenPage implements OnInit {
  entered = false;
  gorde: boolean = false;
  denbora: number = 4;
  erlojua = 4;

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
      timer(2000).subscribe( x =>{
        this.startTimer();
        timer(4000).subscribe( ahh =>{
          this.router.navigate(['/galdera']);
        });
      });
    }
  }
  startTimer(){
    var intervala = setInterval(function(){
      if(this.erlojua != -1){
        this.erlojua -= 1;
        this.denbora = this.erlojua;
        this.gorde = true;
      }
      else{
        this.gorde = false;
        clearInterval(intervala);
      }
    }.bind(this), 1000)
  }
}
