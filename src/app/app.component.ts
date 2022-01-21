import { Component, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { isFunction } from 'is-what';
import { filter } from 'rxjs/operators';

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lu-behaviors';

  constructor(private router: Router,
    private viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {

  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe(data => {
        let value = data.title ? (isFunction(data.title) ? data.title(rt.snapshot.params) : data.title) : "Title"
      })
    })
  }

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if(activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
