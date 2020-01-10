import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor() {}
  
  darkMode(){
    if(document.body.className != "dark")
      document.body.classList.add('dark');
    else{
      document.body.classList.remove("dark");
    }
}
}
