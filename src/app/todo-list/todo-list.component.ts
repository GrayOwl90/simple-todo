import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['../app.component.css']
})
export class TodoListComponent implements OnInit {

  public filterTodos: string = '';

  constructor(private router: Router, public todoService: TodoService) {}

  ngOnInit(): void {

    this.todoService.loadStorage();
    window.addEventListener('storage', () => {
      this.todoService.loadStorage();
    });

    this.todoService.todos.filter((todo) => todo.completedDate !== '' ? todo.completed = true : todo.completed = false);

    this.todoService.todos.filter(function callback(todo) {
      if (todo.deadlineDate !== '' && todo.completedDate !== '') {
        let date1:any = todo.deadlineDate;
        let date2:any = todo.completedDate;
        date1 = date1.split('-').join('');
        date2 = date2.split('-').join('');
        Number(date1) - Number(date2) < 0 ? todo.failured = true : todo.failured = false;
      }
    });
  }

  goTo(todo:any) {
    this.router.navigate(
      ['/item', todo.id]
    )
  }

  changedCompleted() {
    this.todoService.todo.completed = !this.todoService.todo.completed;
    this.todoService.saveStorage();
  }

  changedSelected() {
    this.todoService.todo.selected = !this.todoService.todo.selected;
    this.todoService.todo.selected = false;
  }

  deleteTodo() {
    this.todoService.todos = this.todoService.todos.filter((todo) => !todo.selected);
    this.todoService.saveStorage();
  }

}
