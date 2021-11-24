import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'myFilter'
})

export class FilterPipe implements PipeTransform {
  transform(todos: any[], args?: any): any {
    return todos.filter((todo) => todo.importance = 'usual');
    console.log(todos.importance = 'usual');
  }
}
