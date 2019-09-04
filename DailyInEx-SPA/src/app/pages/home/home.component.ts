import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  focus: any;
  focus1: any;
  test: Date = new Date();
  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  constructor(public location: Location, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
         if (event.url !== this.lastPoppedUrl) {
             this.yScrollStack.push(window.scrollY);
         }
     } else if (event instanceof NavigationEnd) {
         if (event.url === this.lastPoppedUrl) {
             this.lastPoppedUrl = undefined;
             window.scrollTo(0, this.yScrollStack.pop());
         } else {
             window.scrollTo(0, 0);
         }
     }
   });
    this.location.subscribe((ev: PopStateEvent) => {
       this.lastPoppedUrl = ev.url;
   });
  }

    getPath() {
      return this.router.url;
    }

}
