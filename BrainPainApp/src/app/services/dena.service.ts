import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskI } from '../modeloak/task.interface';

@Injectable({
  providedIn: 'root'
})
export class DenaService {

  private denaCollection: AngularFirestoreCollection<TaskI>;
  private dena: Observable<TaskI[]>;

  constructor(db: AngularFirestore) { 
    this.denaCollection = db.collection<TaskI>('dena');
    this.dena = this.denaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getDenak(){
    return this.dena;
  }

  getDena(id: string){
    return this.denaCollection.doc<TaskI>(id).valueChanges();
  }

  updateDena(dena:TaskI, id: string){
    return this.denaCollection.doc(id).update(dena);
  }
  
  addDena(dena: TaskI){
    return this.denaCollection.add(dena);
  }
  
  removeDena(id: string){
    return this.denaCollection.doc(id).delete();
  }

}