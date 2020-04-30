import { Component, OnInit } from '@angular/core';
import { TaskI } from '../models/task.interface';
import { TodoService } from '../services/todo.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  todos: TaskI[];

  constructor(private todoService: TodoService){}
  
  ngOnInit(){
    this.todoService.getTodos().subscribe((recorrido) =>{

      this.todos = recorrido;
    })
  }
  onRemove(idTask:string){
    this.todoService.removeTodo(idTask);
  }
}
