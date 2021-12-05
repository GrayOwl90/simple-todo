import { Component, OnInit } from '@angular/core';
import {TodoService} from "../todo.service";
import {Todo} from "../todo";
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent implements OnInit {

  importance: string[] = ["usual", "important", "veryImportant"];
  statusMessage: string = "";

  constructor(public todoService: TodoService, public storageService: StorageService){
  }
  //todo;
  ngOnInit(): void {
    //this.todo = ('if new') ? new Todo(0, "", "", false, false, "usual", false, this.takeThisDay(), {startDate: null, endDate: null}, {startDate: null, endDate: null}) : this.todoService.todo
  }

  addTodo(){
    this.todoService.todo.id++;
    this.todoService.todos.push(new Todo(
      this.todoService.todo.id,
      this.todoService.todo.name,
      this.todoService.todo.description,
      this.todoService.todo.completed,
      this.todoService.todo.selected,
      this.todoService.todo.importance,
      this.todoService.todo.failured,
      this.todoService.takeThisDay(),
      this.todoService.todo.deadlineDate?.startDate?.startOf('day').unix(),
      this.todoService.todo.completedDate?.startDate?.startOf('day').unix()
    ));
    this.storageService.saveStorage();
    this.todoService.todo.name = '';
    this.todoService.todo.description = '';
    this.todoService.todo.importance = 'usual';
    this.todoService.todo.deadlineDate = null;
    this.todoService.todo.completedDate = null;

    this.statusMessage = 'Данные успешно добавлены';
  }
}
