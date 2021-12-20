import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TodoService} from "../todo.service";
import {StorageService} from "../storage.service";
import * as moment from "moment";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {

  statusMessage: string = "";

  constructor(private router: Router, public todoService: TodoService, public storageService: StorageService) {}

  ngOnInit(): void {
    this.storageService.loadStorage();
    window.addEventListener('storage', () => {
      this.storageService.loadStorage();
    });
    this.todoService.checkCompleted();
    this.todoService.checkFailured();
  }

  filterImp(filterTodos:string) {
    this.storageService.loadStorage();
    this.todoService.checkCompleted();
    this.todoService.checkFailured();
    if (filterTodos) {
      this.todoService.todos = this.todoService.todos.filter(todo => {
        return todo.importance === filterTodos;
      });
    }
  }

  goTo(todo:any) {
    this.router.navigate(['/item', todo.id]);
  }

  checkCompletedChange() {
    this.todoService.changedCompleted();
    this.storageService.saveStorage();
  }

  changedSelected() {
    this.todoService.todo.selected = !this.todoService.todo.selected;
    this.todoService.todo.selected = false;
  }

  deleteTodo() {
    this.todoService.todos = this.todoService.todos.filter((todo) => !todo.selected);
    this.storageService.saveStorage();
    this.statusMessage = 'Данные успешно удалены';
  }

}
