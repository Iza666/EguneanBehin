import { Component, OnInit } from '@angular/core';
import { DenaService } from './../services/dena.service';
import { Galdera } from './../modeloak/galdera';


@Component({
  selector: 'app-galdera',
  templateUrl: './galdera.page.html',
  styleUrls: ['./galdera.page.scss'],
})
export class GalderaPage implements OnInit {

  constructor(private DenaService : DenaService) { }

  id = 0;
  ngOnInit() {
    this.getGalderak();
  }
  galderak : Galdera[];
  galdera : Galdera;
  getGalderak(): void{
    this.DenaService.getGalderak()
    .subscribe(data => {this.galderak = data},
       error=> console.log("Error ::"+ error));
  }
  bidaliGalderak(a: number): void{
    if(a == 1){
      let id: number = 1;
      let json : string = '{"id_erabiltzailea" : '+this.id+'}';
      alert(JSON.parse(json));
    }
    if(a == 2){
      alert("txarra");
    }
    if(a == 3){
      alert("txarra");
    }
  }
  
}
