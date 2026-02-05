import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css', '../app.component.css']
})
export class TemplateComponent {
  constructor(private router: Router) { }

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }
}
