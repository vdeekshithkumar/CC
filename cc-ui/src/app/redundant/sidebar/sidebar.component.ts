import { Component, ElementRef, HostListener, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  showPopup1: boolean = false;
  showPopup2: boolean = false;
  showPopup : boolean =  false;
  isDropdownOpen: boolean = false;
  showPopupp: boolean  = false;
  popupMaxHeight: number = 150;
  constructor(public dialog: MatDialog,private router: Router,private el: ElementRef){}
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
  reloadMySpaceAd() {
    const queryParams = { type: 'space' };
    this.router.navigate(['/my-ad'], { queryParams: queryParams })
      .then(() => {
        window.location.reload(); // Reload the component after navigation
      });
  }
  reloadOtherLeaseSpaceAd() {
    const queryParams = { type: 'space', typee:'Leasing' };
    this.router.navigate(['/view-other-ads'], { queryParams: queryParams })
      .then(() => {
        window.location.reload(); // Reload the component after navigation
      });
  }
  reloadOtherTradSpaceAd() {
    const queryParams = { type: 'space' , typee:'Trading'};
    this.router.navigate(['/view-other-ads'], { queryParams: queryParams })
      .then(() => {
        window.location.reload(); // Reload the component after navigation
      });
  }
  reloadMyContAd() {
    const queryParams = { type: 'container' };
    this.router.navigate(['/my-ad'], { queryParams: queryParams })
      .then(() => {
        window.location.reload(); // Reload the component after navigation
      });
  }
  reloadOtherLeasContAd() {
    const queryParams = { type: 'container', typee:'Leasing'};
    this.router.navigate(['/view-other-ads'], { queryParams: queryParams })
      .then(() => {
        window.location.reload(); // Reload the component after navigation
      });
  }
  reloadOtherTradContAd() {
    const queryParams = { type: 'container', typee:'Trading'};
    this.router.navigate(['/view-other-ads'], { queryParams: queryParams })
      .then(() => {
        window.location.reload(); // Reload the component after navigation
      });
  }
  togglePopup() {
    this.showPopup = !this.showPopup;
  }
  togglePopupp() {
    this.showPopupp = !this.showPopupp;
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showPopup1 = false;
      this.showPopup2 = false; // Close the pop-up when clicking outside of it
    }
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

  togglePopup1() {
    this.showPopup1 = !this.showPopup1;
    if (this.showPopup1) {
      this.showPopup2 = false; // Close the other popup when this one opens
    }
  }

  togglePopup2() {
    this.showPopup2 = !this.showPopup2;
    if (this.showPopup2) {
      this.showPopup1 = false; // Close the other popup when this one opens
    }
  }
}
  
