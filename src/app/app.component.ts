import { Component } from '@angular/core';
import {Todo} from "./todo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  todo: Todo = new Todo(0, "", "", false, false, "usual", this.takeThisDay(), '', '');
  public todos: Todo[] = [];

  importance: string[] = ["usual", "important", "veryImportant"];
  isFailure = false;

  ngOnInit() {

    this.loadStorage();
    window.addEventListener('storage', () => {
      this.loadStorage();
    });

    // let todoFail = this.todos.filter((todo) => Number(this.todo.deadlineDate) - Number(this.todo.completedDate) < 0);
    // console.log(todoFail);

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

  changedCompleted() {
    if (this.todo.completed == false) {
      this.todo.completed = true;
    } else {
      this.todo.completed = false;
    }
    localStorage.setItem('store', JSON.stringify(this.todos));
  }

  changedSelected() {
    if (this.todo.selected == false) {
      this.todo.selected = true;
    } else {
      this.todo.selected = false;
    }
    this.todo.selected = false;
  }

  addTodo(){
    this.todo.id++;
    this.todos.push(new Todo(this.todo.id, this.todo.name,
      this.todo.description, this.todo.completed, this.todo.selected, this.todo.importance,
      this.takeThisDay(), this.todo.deadlineDate, this.todo.completedDate));
    localStorage.setItem('store', JSON.stringify(this.todos));
  }

  filterTodos(selectImportance:any) {
    this.todos = JSON.parse(localStorage.getItem('store') as string);
    switch(selectImportance) {
      case 'usual':
        let uTodos = this.todos.filter((todo) => todo.importance == selectImportance);
        this.todos = uTodos;
        break;
      case 'important':
        let iTodos = this.todos.filter((todo) => todo.importance == selectImportance);
        this.todos = iTodos;
        break;
      case 'veryImportant':
        let viTodos = this.todos.filter((todo) => todo.importance == selectImportance);
        this.todos = viTodos;
        break;
      default:
        let allTodos = this.todos.filter((todo)=> todo.importance == 'usual' || 'important' || 'veryImportant');
        this.todos = allTodos;
    }
  }

  // editTodo(){
  //   this.todo = this.todo.indexOf(todo[]);
  // }

  // failedTask() {
  //   let failsResult = Number(this.todo.deadlineDate) - Number(this.todo.completedDate);
  //   if (failsResult < 0) {
  //     this.isFailure = true;
  //   }
  //   console.log(this.isFailure);
  // }

  deleteTodo() {
    this.todos = this.todos.filter((todo) => !todo.selected);
    localStorage.setItem('store', JSON.stringify(this.todos));
  }

}
