import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  implements OnInit{

  @Input() portCode!: string;
  @Input() portId!: number;
  @Input() containersize!:number;
  @Input() containertype!:string;
  @Input() surplus!: number;
  @Input() deficit!: number 
  @Input() surplusPercentage!: number; // New input
  @Input() deficitPercentage!: number; // New input
  ngOnInit(): void {
    console.log("to form",this.surplusPercentage)
    console.log("to form",this.deficitPercentage)
  }
}

