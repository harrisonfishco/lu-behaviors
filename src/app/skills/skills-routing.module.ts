import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BehaviorDetailAltComponent } from './behavior-detail-alt/behavior-detail-alt.component';

const routes: Routes = [
  { path: 'behaviors/:id', component: BehaviorDetailAltComponent, data: {title: params => `Behavior #${params['id']}`}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsRoutingModule { }
