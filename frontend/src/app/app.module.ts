import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MyAgmExampleComponent } from './my-agm-example/my-agm-example.component';

@NgModule({
  declarations: [
    AppComponent,
    MyAgmExampleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDEkxJNQFjBdFMzOueMCl1Qsk1RtPvAOvg',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
