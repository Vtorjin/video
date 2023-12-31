import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DownloadModule } from '../views/download/download.module';
import { OnlineModule } from '../views/online/online.module';
import { SharedPipesModule } from '../pipe/share.module';
import { PlayerModule } from '../views/player/player.module';
import { HomeModule } from '../views/home/home.module';
import { RouteReuseStrategy } from '@angular/router';
import { RouteStrategyService } from '../service/router.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedPipesModule,
    DownloadModule,
    OnlineModule,
    PlayerModule,
    HomeModule,
    BrowserAnimationsModule
  ],
  providers: [
    // {
    //   provide:RouteReuseStrategy,
    //   useClass:RouteStrategyService
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
