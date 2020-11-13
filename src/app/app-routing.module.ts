import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { TestComponent } from './test/test.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: "test", component: TestComponent},
  {path: "first", component: FirstComponent},
  {path: "second", component: SecondComponent},
  {path: "user/:id", component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }