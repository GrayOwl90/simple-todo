import {Injectable} from '@angular/core';
import {Todo} from "./todo";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todo: Todo = new Todo(0, "", "", false, false, "usual", false, this.takeThisDay(), null, null);
  public todos: Todo[] = [];


  ngOnInit() {



    this.todos.filter(function callback(todo) {
      // if (todo.deadlineDate !== '' && todo.completedDate !== '') {
      //   // let date1 = moment(todo.deadlineDate);
      //   // let date2 = moment(todo.completedDate);
      //   // let duration = moment.duration(date1.diff(date2));
      //   // console.log(duration, 'days');
      //   // date1 = date1.split('-').join('');
      //   // date2 = date2.split('-').join('');
      //   // Number(date1) - Number(date2) < 0 ? todo.failured = true : todo.failured = false;
      // }
    });

  }

  // takeTodo(id:number) {
  //   if ()
  // }

  checkCompleted() {
    this.todos.filter((todo) => todo.completedDate ? todo.completed = true : todo.completed = false);
    console.log('1', this.todos);
  }

  takeThisDay(){
    let myDate: string = moment().format('YYYY-MM-DD');
    return myDate;
  }

}
