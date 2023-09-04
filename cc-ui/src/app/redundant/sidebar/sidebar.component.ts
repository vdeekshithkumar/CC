import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  showPopup = false;
  showPopupp = false;
  constructor(public dialog: MatDialog){}
  changeImageColor(event: MouseEvent) {
    const svg = (event.currentTarget as HTMLElement).querySelector('svg');
    if (svg) {
      svg.classList.add('blue');
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(SidebarComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  togglePopup() {
    this.showPopup = !this.showPopup;
  }
  togglePopupp() {
    this.showPopupp = !this.showPopupp;
  }
 
}
