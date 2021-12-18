import {Injectable} from '@angular/core';
import {Todo} from "./todo";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todo: Todo = this.createTodo();
  public todos: Todo[] = [];

  ngOnInit() {}

  addTodo(tades:any){
    this.todo.id++;
    this.todos.push(new Todo(
      this.todo.id,
      tades.name,
      tades.description,
      this.todo.completed,
      this.todo.selected,
      tades.importance,
      this.todo.failured,
      this.takeThisDay(),
      tades.deadlineDate?.startDate?.startOf('day').unix(),
      tades.completedDate?.startDate?.startOf('day').unix()
    ));

  }

  getTodo(currentId: number) {
    let todo:any = this.todos.find((todo) => todo.id == currentId);
    // todo.deadlineDate = {"startDate": moment.unix(todo.deadlineDate).format("YYYY-MM-DD"), "endDate": moment.unix(todo.deadlineDate).format("YYYY-MM-DD")};
    // todo.completedDate = {"startDate": moment.unix(todo.completedDate).format("YYYY-MM-DD"), "endDate": moment.unix(todo.completedDate).format("YYYY-MM-DD")};
    return todo;
  }

  createTodo() {
    return new Todo(0, "", "", false, false, "usual", false, this.takeThisDay(), null, null);
  }

  changedCompleted() {
    this.todo.completed = !this.todo.completed;
  }

  checkCompleted() {
    this.todos.filter((todo) => todo.completedDate || todo.completed ? todo.completed = true : todo.completed = false);
  }

  checkFailured() {
    this.todos.filter(function callback(todo) {
        if (todo.deadlineDate !== null && todo.completedDate !== null) {
          let duration = todo.deadlineDate - todo.completedDate;
          duration = duration / 60 / 60 / 24;
          duration < 0 ? todo.failured = true : todo.failured = false;
        }
    });
  }

  takeThisDay(){
    let myDate: string = moment().format('YYYY-MM-DD');
    return myDate;
  }

}
