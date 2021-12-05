import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TodoService} from "../todo.service";
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {

  public filterTodos: string = '';
  statusMessage: string = "";

  constructor(private router: Router, public todoService: TodoService, public storageService: StorageService) {}

  ngOnInit(): void {



    this.storageService.loadStorage();
    window.addEventListener('storage', () => {
      this.storageService.loadStorage();
    });

    this.todoService.checkCompleted();

    //this.todoService.todos.filter((todo) => todo.completedDate !== '' ? todo.completed = true : todo.completed = false);

  }

  goTo(todo:any) {
    //if(!todo.id) {
      this.router.navigate(
        ['/item', todo.id]
      )
    // } else {
    //   this.router.navigate(['/']);
    //   alert('Такой таски не существует!');
    // }

  }

  changedCompleted() {
    this.todoService.todo.completed = !this.todoService.todo.completed;
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
