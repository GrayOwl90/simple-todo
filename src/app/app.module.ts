import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {Routes, RouterModule} from "@angular/router";
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoFilterPipe } from './todo-filter.pipe';

const appRoutes: Routes =[
  { path: '', component: TodoListComponent},
  { path: 'form', component: TodoFormComponent},
  { path: 'item/:id', component: TodoEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoEditComponent,
    TodoFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgxDaterangepickerMd.forRoot({
      displayFormat: 'YYYY-MM-DD'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
