import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/session.service';
import { ForecastingTableService } from './forecasting-table-view.service';

interface Inventory {
  inventory_id:number,
  date_created:Date,
  last_modified:Date,
  company_id:number,
  container_type:string,
  available: number,
  maximum: number,
  minimum:number,
  port_id:number,
  updated_by:string,
  container_size:number,
  deficit:number,
  surplus:number,

  // Add any other properties here
}
@Component({
  selector: 'app-forecasting-table-view',
  templateUrl: './forecasting-table-view.component.html',
  styleUrls: ['./forecasting-table-view.component.css']
})

export class ForecastingTableViewComponent implements OnInit{
  
  showModal=false;
  searchTerm:any;
  data:any;
  surplus:any;
  deficit:any;
  ForecastingForm!:FormGroup;
  currentUser: any;
  userId: any;
  companyId: any;
  p:any;
  inventoryId: any;
  inventory_list=null;
inventory_data: any;
port_id: any;
inventory_list_by_companyId: Inventory[] = [];
sortedData: Inventory[] = [];
port_list:any;
port_name="";
itemsPerPage: number = 10;
currentPage: number = 1;
records:any[]=[];
// inventory_list_by_companyId: any[] = [];
  contracts: any;
  dataa = [{ surplus: 10 }, { surplus: 5 }, { surplus: 20 }];
 
constructor(private formBuilder: FormBuilder,private sessionService: SessionService,private router:Router,private forecastingtableService:ForecastingTableService) { 
}
ngOnInit(): void {
  //user id from session 
  this.sessionService.getUserId().subscribe(
    (userId: number) => {
      this.userId = userId;
      console.log('User ID is :', userId);
    },
    (error: any) => {
      console.error('Error retrieving user ID:', error);
    }
  );
  this.sessionService.getCompanyId().subscribe(
    (companyId: number) => {
      this.companyId = companyId;
      console.log('company ID is :', companyId);
    },
    (error: any) => {
      console.error('Error retrieving company ID:', error);
    }
  );
  const now = new Date();
     const formattedDate = now.toISOString().split('T')[0]; // get date in format yyyy-mm-dd
     this.ForecastingForm = this.formBuilder.group({
       inventory_id:['8'],
       date_created:['2023-03-28'],
       last_modified:formattedDate,
       company_id:this.companyId,
       container_type:['',Validators.required],
       available: ['', Validators.required],
       maximum: ['', Validators.required],
       minimum:['', Validators.required],
       port_id:['',Validators.required],
       updated_by:this.userId,
       container_size:['',Validators.required],
       deficit:['',Validators.required],
       surplus:['',Validators.required]
  
     });
     this.forecastingtableService.getAllPorts().subscribe(
      data => {   
        this.port_list = data;
        console.log("Port list fetched: ", this.port_list); 
      },
      error => {
        console.log("ports loading error:" +error);
      }
    );
    this.forecastingtableService.getAllInventory().subscribe(
      data => {
        this.inventory_list = data;
        console.log("inv list fetched: ", this.inventory_list); 
      },
      error => {
        console.log("inv loading error:" +error);
      }
    );
    this.forecastingtableService.getInventoryByIdCID(this.companyId).subscribe(
      data => {
        this.inventory_list_by_companyId = data;
        console.log("inv list by company id is fetched: ", this.inventory_list_by_companyId); 
        this.sortedData = this.inventory_list_by_companyId;
      },
      error => {
        console.log("inv loading error:" +error);
      }
    );
    this.sessionService.getCurrentUser().subscribe(user => {
      // if (user.id==null && user.token==null) {  // use this once token is used for a user
      if (user.user_id==null) 
      {
        // if user session is null, redirect to login page
        this.router.navigate(['/sign-in']);
      }
      else{
        this.currentUser = user;
        console.log('From session inside inventory '+this.currentUser.email+'   id here '+this.currentUser.user_id)
  
        }
      // store the user session information in a property
      
    })
    this.sortedData = this.data;
  }
  sortData(sortOrder: string): void {
    if (sortOrder === 'asc') {
      this.sortedData = this.inventory_list_by_companyId.sort((a, b) => a.surplus - b.surplus);
    } else if (sortOrder === 'desc') {
      this.sortedData = this.inventory_list_by_companyId.sort((a, b) => b.surplus - a.surplus);
    } 
  }
  
    getPortName(portId: number): string {
      const port = this.port_list.find((p: { port_id: number, port_name: string }) => p.port_id === portId);
      return port ? port.port_name : '';
  }
  
    getInventoryById(inv_id: number) {
    
      this.forecastingtableService.getInventoryById(inv_id)
        .subscribe(
          (        data: any) => {
         
            this.inventory_data = data;
          
            console.log("single inventory received"+this.inventory_data);
            // console.log(this.inventory_data.inventory_id);
        
            
  
          },
          (        error: any) => console.log(error));
    }
    get totalPages(): number {
      return Math.ceil(this.records.length / 5);
    }
    prevPage() {
  
      if (this.currentPage > 1) {
        this.currentPage--;
      }
       }
       nextPage() {
        if (this.currentPage < Math.ceil(this.contracts.length / this.itemsPerPage)) {
          this.currentPage++;
        }
      
       }
       backPage(){
        this.router.navigate(['forecasting']);
       }
  onSubmit(){
  
  }
  
}
  
