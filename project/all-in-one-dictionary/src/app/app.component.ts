import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'all-in-one-dictionary';
  scrolled = false;

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event): void => {
    if(window.pageYOffset > 0)
    {
      this.scrolled = true;
    }
    else
    {
      this.scrolled = false;
    }
  };
  
  onScrollUp() {
    if(window.pageYOffset > 0)
    {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}
