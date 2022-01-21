import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LuDocsService, LuJsonService, LuLocaleService } from './services';
import { SkillsComponent } from './skills/skills.component';
import { MessageService } from './util/services/message.service';
import { UtilModule } from './util/util.module';

@NgModule({
  declarations: [
    AppComponent,
    SkillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UtilModule,
    HttpClientModule
  ],
  providers: [
    LuJsonService,
    MessageService,
    LuLocaleService,
    LuDocsService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
