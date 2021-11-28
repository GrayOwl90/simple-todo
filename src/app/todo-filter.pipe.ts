import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from "./todo";

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {

  transform(todos: Todo[], filterTodos: string = ''): Todo[] {
    if(!filterTodos) {
      return todos;
    }
    return todos.filter(todo => {
      return todo.importance.indexOf(filterTodos) !== -1;
    })
  }

}
