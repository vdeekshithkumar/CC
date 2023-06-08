import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-template',
  templateUrl: './home-template.component.html',
  styleUrls: ['./home-template.component.css','../app.component.css']
})
export class HomeTemplateComponent {
  constructor(private route: ActivatedRoute,private router:Router){}

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

}