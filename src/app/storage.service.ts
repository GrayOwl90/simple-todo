import { Injectable } from '@angular/core';
import {TodoService} from "./todo.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  loadStorage() {
    if(localStorage.getItem('store')) {
      this.todoService.todos = JSON.parse(localStorage.getItem('store') as string);
    }
  }

  saveStorage() {
    localStorage.setItem('store', JSON.stringify(this.todoService.todos));
  }
}
