import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
// import "./assets/css/global.css"



console.log("???????")

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
