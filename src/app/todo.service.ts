import {Injectable, Output} from '@angular/core';
import {Todo} from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todo: Todo = new Todo(0, "", "", false, false, "usual", false, this.takeThisDay(), '', '');
  @Output() public todos: Todo[] = [];

  ngOnInit() {

    this.loadStorage();
    window.addEventListener('storage', () => {
      this.loadStorage();
    });
  }

  takeThisDay(){
    let myDate = new Date();
    let Month = myDate.getMonth();
    if (Month > 0) {
      Month = Month + 1;
    }
    return `${myDate.getFullYear()}-${Month}-${myDate.getDate()}`;
  }

  loadStorage() {
    if(localStorage.getItem('store')) {
      this.todos = JSON.parse(localStorage.getItem('store') as string);
      this.todo.id = Number(this.todos[this.todos.length - 1].id);
    }
  }

  saveStorage() {
    localStorage.setItem('store', JSON.stringify(this.todos));
  }

}
