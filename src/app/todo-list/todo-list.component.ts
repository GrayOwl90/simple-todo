import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['../app.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private router: Router, public todoService: TodoService) { }

  ngOnInit(): void {

    this.todoService.loadStorage();
    window.addEventListener('storage', () => {
      this.todoService.loadStorage();
    });

    if(this.todoService.todo.completedDate !== null) {
      this.todoService.todo.completed = true;
      this.todoService.saveStorage();
    }

    if (this.todoService.todo.deadlineDate !== null && this.todoService.todo.completedDate !== null) {
      this.todoService.todos.filter((todo) =>
        Number(this.todoService.todo.deadlineDate) - Number(this.todoService.todo.completedDate) < 0 ?
        this.todoService.todo.failured = true : this.todoService.todo.failured = false);
    }
    console.log(this.todoService.todos);
  }

  goTo(id:number) {
    this.router.navigate(['/item', id])
  }

  changedCompleted() {
    if (this.todoService.todo.completed == false) {
      this.todoService.todo.completed = true;
    } else {
      this.todoService.todo.completed = false;
    }
    this.todoService.saveStorage();
  }

  changedSelected() {
    if (this.todoService.todo.selected == false) {
      this.todoService.todo.selected = true;
    } else {
      this.todoService.todo.selected = false;
    }
    this.todoService.todo.selected = false;
  }

  filterTodos(selectImportance:any) {
    this.todoService.todos = JSON.parse(localStorage.getItem('store') as string);
    switch(selectImportance) {
      case 'usual':
        let uTodos = this.todoService.todos.filter((todo) => todo.importance == selectImportance);
        this.todoService.todos = uTodos;
        break;
      case 'important':
        let iTodos = this.todoService.todos.filter((todo) => todo.importance == selectImportance);
        this.todoService.todos = iTodos;
        break;
      case 'veryImportant':
        let viTodos = this.todoService.todos.filter((todo) => todo.importance == selectImportance);
        this.todoService.todos = viTodos;
        break;
      default:
        let allTodos = this.todoService.todos.filter((todo)=> todo.importance == 'usual' || 'important' || 'veryImportant');
        this.todoService.todos = allTodos;
    }
  }

  deleteTodo() {
    this.todoService.todos = this.todoService.todos.filter((todo) => !todo.selected);
    this.todoService.saveStorage();
  }

}
