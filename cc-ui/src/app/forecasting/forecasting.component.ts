import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-forecasting',
  templateUrl: './forecasting.component.html',
  styleUrls: ['./forecasting.component.css']
})
export class ForecastingComponent implements OnInit{
 
  constructor(private formBuilder: FormBuilder,private sessionService: SessionService,private router:Router) { 
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  options = ['Map', 'Table', 'Surplus','Deficit'];
  selectedOption = 0;
  selectOption(index: number) {
    this.selectedOption = index;
    if (this.options[index] === 'Table') {
      this.router.navigate(['/forecasting-table-view']);
    }
  }
}
