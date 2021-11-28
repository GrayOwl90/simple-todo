import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TodoService} from "../todo.service";
import {Subscription} from "rxjs";
import {Todo} from "../todo";

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['../app.component.css']
})
export class TodoEditComponent implements OnInit {

  public editedTodo: Todo | any = new Todo(0, "", "", false, false, "usual", false, '', '', '');

  private subscription: Subscription;
  importance: string[] = ["usual", "important", "veryImportant"];

  constructor(private activateRoute: ActivatedRoute, public todoService: TodoService){

    this.subscription = activateRoute.params.subscribe(params => {
      this.todoService.todo.id = +params['id']
    });

  }

  ngOnInit(): void {

    const currentId = this.todoService.todo.id;

    if(localStorage.getItem('store')) {
      this.todoService.todos = JSON.parse(localStorage.getItem('store') as string);
    }

    this.editedTodo = this.todoService.todos.find((todo) => todo.id == currentId);

    //console.log("editedTodo", this.editedTodo);
  }

  saveTodo(todo: Todo){

    this.todoService.saveStorage();

  }
}
