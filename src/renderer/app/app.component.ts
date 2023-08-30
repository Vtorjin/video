import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from "./app-routing.module"



var win = window;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  title = 'video';
  routes = routes.filter(r => !!r.title)
  isDragging = false;
  offsetX = 0
  offsetY = 0;
  constructor(
    private routerInfo: ActivatedRoute,
    private router: Router
  ) {
    console.log(localStorage.getItem('path'));
    window.addEventListener('hashchange', function () {
      console.log(...arguments, '路由有变化1');
    })


    window.addEventListener('popstate', function () {
      console.log(...arguments, '路由有变化');
    })

    window.onhashchange = function () {
      console.log(...arguments, '路由有变化3');
    }

    window.onpopstate = function () {
      console.log(...arguments, '路由有变化4');
    }

    window.onbeforeunload = () => {
      alert('jhahahha')
    }

  }

  ngOnInit() {
    let root = document.querySelector('#app-header');
    let me = this;
    if (root === null) return;

    root.addEventListener('mousedown', function (e: any) {
      me.isDragging = true;
      const bounds = (root as HTMLElement).getBoundingClientRect();
      me.offsetX = bounds.x - e.clientX;
      me.offsetY = bounds.y - e.clientY;
    })

    document.addEventListener('mousemove', (e: any) => {
      if (!me.isDragging) return;
      window['videoApp'].moveWindowPos(e.clientX + me.offsetX, e.clientY + me.offsetY);
    });

    document.addEventListener('mouseup', () => {
      me.isDragging = false;
    });
  }



  backHome() {
    this.router.navigate([''])
  }

  min() {
    window['videoApp'].min();
  }

  max() {
    window['videoApp'].max();
  }

  show() {
    window['videoApp'].show();

  }

  hide() {
    window['videoApp'].hide();
  }

  quit() {
    window['videoApp'].quit();
  }
}
