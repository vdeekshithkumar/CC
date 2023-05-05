import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForecastingService } from './forecasting.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-forecasting',
  templateUrl: './forecasting.component.html',
  styleUrls: ['./forecasting.component.css']
})

export class ForecastingComponent implements OnInit{
 
constructor(private formBuilder: FormBuilder,private sessionService: SessionService,private router:Router,private forecastingService:ForecastingService) { 
}
  ngOnInit(): void {
//user id from session 
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