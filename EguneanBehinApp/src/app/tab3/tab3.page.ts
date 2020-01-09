import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}
  
  darkMode(){
    if(document.body.className != "dark")
      document.body.classList.add('dark');
    else{
      document.body.classList.remove("dark");
    }
}
}
