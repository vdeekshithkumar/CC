import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { CarrierServiceService } from './carrier-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrier-service',
  templateUrl: './carrier-service.component.html',
  styleUrls: ['./carrier-service.component.css']
})
export class CarrierServiceComponent implements OnInit  {
  public company_id?: number;
  public port_id?:number;
  companyId:any;
  servicename:any;
  userId:any;
  seq_no?:number;
  latitude?:number;
  longitude?:number;
  port_code?:string;
  port_name?:string;
  service_name?: string;
  service_id?:number;
  selectedService: any;
  services: any[] = [];
  servicenames:any[]=[];
  companyName:any;
  getCompanyId() {
    return this.company_id;
  }

constructor(private sessionService: SessionService,private carrierservice:CarrierServiceService,private router: Router) {


}
  ngOnInit(): void {
    
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        this.companyName=this.companyName;
        console.log('company ID is :', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );
    this.sessionService.getUserId().subscribe(
      (userId: number) => {
        this.userId = userId;
        console.log('User ID is :', userId);
      },
      (error: any) => {
        console.error('Error retrieving user ID:', error);
      }
    );
    
    this.carrierservice.getCarrierServicesbyCId(this.companyId).subscribe(
      (data: any[]) => { 
        
        for (let i = 0; i < data.length; i++) {
          const service = data[i];
          console.log("Carrier service", service);
          this.company_id = service.company_id;
          this.service_name = service.service_name;
          this.service_id = service.service_id;
          this.services = data;
        }
      },
      error => {
        console.warn("oninit error", error);
      }
    );

    // this.carrierservice.getCarrierServicesbySName(this.servicename).subscribe(
    //   (data: any[]) => { 
    //     debugger;
    //     for (let i = 0; i < data.length; i++) {
    //       const service = data[i];
    //       console.log("Carrier service Name based data", service);
    //       this.port_id = service.port_id;
    //       this.port_code = service.port_code;
    //       this.seq_no = service.seq_no;
    //       this.latitude=service.latitude;
    //       this.longitude=service.longitude;
    //       this.services = data;
    //     }
    //   },
    //   error => {
    //     console.warn("oninit error", error);
    //   }
    // );
  }
  getServiceDetails(serviceName: string) {
    // Use router to navigate to the service route with the serviceName parameter
    this.router.navigate(['/route-service', serviceName]);
  }
  
  
}
