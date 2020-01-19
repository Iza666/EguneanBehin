import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-kargatzen',
  templateUrl: './kargatzen.page.html',
  styleUrls: ['./kargatzen.page.scss'],
})
export class KargatzenPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    timer(3000).subscribe( x =>{
      this.router.navigate(['/galdera']);
    });
  }
}
