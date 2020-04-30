import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskI } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  private recorridoCollection: AngularFirestoreCollection<TaskI>;
  private recorrido: Observable<TaskI[]>;

  constructor(db:AngularFirestore) { 
    this.recorridoCollection = db.collection<TaskI>('recorrido');
    this.recorrido = this.recorridoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getTodos(){
    return this.recorrido;
  }

  getTodo(id: string){
    return this.recorridoCollection.doc<TaskI>(id).valueChanges();
  }

  updateTodo(todo:TaskI, id: string){
    return this.recorridoCollection.doc(id).update(todo);
  }
  
  addTodo(todo: TaskI){
    return this.recorridoCollection.add(todo);
  }
  
  removeTodo(id: string){
    return this.recorridoCollection.doc(id).delete();
  }

}




