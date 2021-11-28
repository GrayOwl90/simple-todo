import { Component, OnInit } from '@angular/core';
import {TodoService} from "../todo.service";
import {Todo} from "../todo";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['../app.component.css']
})
export class TodoFormComponent implements OnInit {

  importance: string[] = ["usual", "important", "veryImportant"];
  constructor(public todoService: TodoService){
  }
  ngOnInit(): void {
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
      this.todoService.todo.deadlineDate,
      this.todoService.todo.completedDate
    ));
    this.todoService.saveStorage();
    this.todoService.todo.name = '';
    this.todoService.todo.description = '';
    this.todoService.todo.importance = 'usual';
    this.todoService.todo.deadlineDate = '';
    this.todoService.todo.completedDate = '';
  }
}
