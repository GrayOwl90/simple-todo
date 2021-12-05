import { Injectable } from '@angular/core';
import {TodoService} from "./todo.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    // this.loadStorage();
    // window.addEventListener('storage', () => {
    //   this.loadStorage();
    // });
  }

  loadStorage() {
    if(localStorage.getItem('store')) {
      this.todoService.todos = JSON.parse(localStorage.getItem('store') as string);
      this.todoService.todo.id = Number(this.todoService.todos[this.todoService.todos.length - 1].id);
    }
  }

  saveStorage() {
    localStorage.setItem('store', JSON.stringify(this.todoService.todos));
  }
}
