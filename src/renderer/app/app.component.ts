import { Component } from '@angular/core';
import { routes } from "./app-routing.module"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'video';
  routes = routes.filter(r => !!r.title)
}
