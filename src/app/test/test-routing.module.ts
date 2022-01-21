import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test.component';

const routes: Routes = [];

const testRoutes: Routes = [
  { path: '', component: TestComponent, data: { title: "Test"}}
]

@NgModule({
  imports: [RouterModule.forChild(testRoutes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
