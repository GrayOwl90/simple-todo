// interface IDatePicker {
//   startDate: any,
//   endDate: any
// }

export class Todo {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public completed: boolean,
    public selected: boolean,
    public importance: 'usual' | 'important' | 'veryImportant',
    public failured: boolean,
    public createdDate: string,
    public deadlineDate?: any,
    public completedDate?: any){}
}
