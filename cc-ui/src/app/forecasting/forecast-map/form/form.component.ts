import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() portCode!: string;
  @Input() portId!: number;
  @Input() surplus!: number;
  @Input() deficit!: number 
}
