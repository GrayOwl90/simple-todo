import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TodoService} from "../todo.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['../app.component.css']
})
export class TodoEditComponent implements OnInit {

  id: number | undefined;
  private subscription: Subscription;
  importance: string[] = ["usual", "important", "veryImportant"];

  constructor(private activateRoute: ActivatedRoute, public todoService: TodoService){

    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);

  }

  ngOnInit(): void {
    //console.log('todo id', this.todoService.todo.id);


  }

  // editTodo(id:number){
  //   const idx = this.todos.findIndex(t => t.id == id);
  //   this.todos[idx] = this.todo
  // }
}
