import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillComponent } from './skill/skill.component';
import { DescriptionUiComponent } from './description-ui/description-ui.component';
import { BehaviorDetailComponent } from './behavior-detail/behavior-detail.component';
import { BehaviorDetailAltComponent } from './behavior-detail-alt/behavior-detail-alt.component';


@NgModule({
  declarations: [
    SkillComponent,
    DescriptionUiComponent,
    BehaviorDetailComponent,
    BehaviorDetailAltComponent
  ],
  imports: [
    CommonModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule { }
