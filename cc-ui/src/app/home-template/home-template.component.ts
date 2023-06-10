import { Component, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-home-template',
  templateUrl: './home-template.component.html',
  styleUrls: ['./home-template.component.css','../app.component.css']
})
export class HomeTemplateComponent {
  constructor(private route: ActivatedRoute,private router:Router,private sharedservice: SharedServiceService){}
  registeredEmail: any;


  updateRegisteredEmail(email: string) {
    this.registeredEmail = email;
    this.sharedservice.setRegisteredEmail(email);
  }

 
 

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

}