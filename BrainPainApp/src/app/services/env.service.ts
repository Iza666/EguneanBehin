import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {


  //guk api-ra konektatzeko erabiltzen dugun link-a
  API_URL = 'http://127.0.0.1:8000/api/';

  constructor() { }
}
