import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TodoService} from "../todo.service";
import {Subscription} from "rxjs";
import {Todo} from "../todo";
import {StorageService} from "../storage.service";
import * as moment from "moment";

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html'
})

export class TodoEditComponent {

  public editedTodo: Todo | any = new Todo(0, "", "", false, false, "usual", false, '', {startDate: moment(), endDate: moment()}, {startDate: moment(), endDate: moment()});

  subscription: Subscription;
  importance: string[] = ["usual", "important", "veryImportant"];
  statusMessage: string = "";

  constructor(private activateRoute: ActivatedRoute, public todoService: TodoService, public storageService: StorageService){

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

  saveTodo(){
    this.storageService.saveStorage();
    this.statusMessage = 'Данные успешно обновлены';
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
