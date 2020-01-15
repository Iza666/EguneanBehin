import { Component, OnInit } from '@angular/core';
import { DenaService } from './../services/dena.service';
import { Sailkapena } from './../modeloak/sailkapena';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private DenaService : DenaService) {}
  id = 0;
  ngOnInit() {
    this.getSailkapena();
  }
  sailkapena : Sailkapena[];

  getSailkapena(): void{
    this.DenaService.getSailkapena()
    .subscribe(data => {this.sailkapena = data},
       error=> console.log("Error ::"+ error));
  }
  

}
