export class Todo {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public completed: boolean,
    public selected: boolean,
    public importance: 'usual' | 'important' | 'veryImportant',
    public createdDate: string,
    public deadlineDate?: string,
    public completedDate?: string){}
}
