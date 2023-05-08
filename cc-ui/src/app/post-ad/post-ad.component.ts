import { Component, OnInit } from '@angular/core';
import { Select, initTE } from "tw-elements";

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit{
  ngOnInit(): void {
    initTE({ Select });
  }
  options = ['Buy', 'Lease', 'Sell','Swap'];
   selectedOption = 0;
   selectOption(index: number) {
   this.selectedOption = index;
}
selectedCity!: string;
isDropdownVisible: boolean = false;
company_list:any;

onSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  this.selectedCity = value;
  this.isDropdownVisible = false;
  // your code here
}

}