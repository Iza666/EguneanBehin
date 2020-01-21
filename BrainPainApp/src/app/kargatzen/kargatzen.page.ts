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
  denbora: number = 3;
  erlojua = 3;

  constructor(private router: Router) { }

  ngOnInit() {
    timer(500).subscribe( ahh =>{
      this.startTimer();
    });
  }

  ionViewDidEnter(){
    if(this.entered)
    {
      this.router.navigate(['/tabs/tab1']);
    }
    else{
      this.entered = true;
      timer(500).subscribe( x =>{
        timer(3000).subscribe( ahh =>{
          this.router.navigate(['/galdera']);
        });
      });
    }
  }
  startTimer(){
    setInterval(function(){
      console.log(this.erlojua);
      if(this.erlojua != '0'){
        this.erlojua -= 1;
        this.denbora = this.erlojua;
        this.gorde = true;
        console.log(""+this.erlojua);
      }
      else{
        this.gorde = false;
        console.log(this.erlojua);
      }
    }, 1000)
  }
}
