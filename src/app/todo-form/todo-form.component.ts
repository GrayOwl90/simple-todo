import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";
import {TodoService} from "../todo.service";
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent {

  subscription: Subscription;
  importance: string[] = ["usual", "important", "veryImportant"];
  statusMessage: string = "";
  tades:any = {};

  constructor(private activateRoute: ActivatedRoute, public todoService: TodoService, public storageService: StorageService){

    this.subscription = this.activateRoute.params.subscribe(params => {
      this.tades = params['id'] ? this.todoService.getTodo(+params['id']) : this.todoService.createTodo();
    });

  }

  ngOnInit(): void {
    this.storageService.loadStorage();
    window.addEventListener('storage', () => {
      this.storageService.loadStorage();
    });
  }

  saveTodo(tades:any) {
    if (this.tades.id !== 0) {
      tades.deadlineDate = tades.deadlineDate?.startDate?.startOf('day').unix();
      tades.completedDate = tades.completedDate?.startDate?.startOf('day').unix();
      this.todoService.todos = this.todoService.todos.map((todo) => todo.id == this.tades.id ? this.todoService.todo = this.tades : todo);
      // console.log('todo', this.todoService.todo);
      // console.log('tades', this.tades);
      // console.log('todos', this.todoService.todos);
      this.storageService.saveStorage();
      this.statusMessage = 'Данные успешно обновлены';
    } else {
      if(localStorage.getItem('store')) {
        this.todoService.todo.id = Number(this.todoService.todos[this.todoService.todos.length - 1].id);
      }
      this.todoService.addTodo(tades);
      this.storageService.saveStorage();
      this.statusMessage = 'Данные успешно добавлены';
      this.tades.name = '';
      this.tades.description = '';
      this.tades.importance = 'usual';
      this.tades.deadlineDate = null;
      this.tades.completedDate = null;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
