import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  showPopup : boolean =  false;
  isDropdownOpen: boolean = false;
  showPopupp: boolean  = false;
  popupMaxHeight: number = 150;
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
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;

    // Adjust max-height when the dropdown is open
    if (this.isDropdownOpen) {
      this.popupMaxHeight = 300; // Change this value as needed
    } else {
      this.popupMaxHeight = 150; // Reset max-height when the dropdown is closed
    }
  }
}
  
