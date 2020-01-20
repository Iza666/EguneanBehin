import { Component, OnInit } from '@angular/core';
import { SailkapenaService } from '../services/sailkapena.service';
import { Sailkapena } from './../modeloak/sailkapena';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private SailkapenaService : SailkapenaService) {}
  id = 0;
  ngOnInit() {
    this.getSailkapena();
  }
  sailkapena : Sailkapena[];

  getSailkapena(): void{
    this.SailkapenaService.getSailkapena()
    .subscribe(data => {this.sailkapena = data},
       error=> console.log("Error ::"+ error));
  }
  

}
