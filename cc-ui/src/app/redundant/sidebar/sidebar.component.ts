import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  changeImageColor(event: MouseEvent) {
    const svg = (event.currentTarget as HTMLElement).querySelector('svg');
    if (svg) {
      svg.classList.add('blue');
    }
  }
}
