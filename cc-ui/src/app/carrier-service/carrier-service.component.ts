import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { CarrierServiceService } from './carrier-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrier-service',
  templateUrl: './carrier-service.component.html',
  styleUrls: ['./carrier-service.component.css']
})
export class CarrierServiceComponent implements OnInit {
  public company_id?: number;
  public port_id?: number;
  companyId: any;
  servicename: any;
  userId: any;
  seq_no?: number;
  isLoading: boolean = false;
  latitude?: number;
  longitude?: number;
  port_code?: string;
  port_name?: string;
  service_name?: string;
  service_id?: number;
  selectedService: any;
  services: any[] = [];
  servicenames: any[] = [];
  companyName: any;
  getCompanyId() {
    return this.company_id;
  }

  filteredServices: any[] = [];
  searchTerm: string = '';

  constructor(private sessionService: SessionService, private carrierservice: CarrierServiceService, private router: Router) { }

  ngOnInit(): void {
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        console.log('company ID is :', companyId);
      },
      (error: any) => console.error('Error retrieving company ID:', error)
    );

    this.sessionService.getUserId().subscribe(
      (userId: number) => {
        this.userId = userId;
        console.log('User ID is :', userId);
      },
      (error: any) => console.error('Error retrieving user ID:', error)
    );

    this.isLoading = true;
    this.carrierservice.getCarrierServicesbyCId(this.companyId).subscribe(
      (data: any[]) => {
        this.isLoading = false;
        this.services = data;
        this.filteredServices = data; // Initialize filtered list
        if (data.length > 0) {
          const service = data[0];
          this.company_id = service.company_id;
          this.service_name = service.service_name;
          this.service_id = service.service_id;
        }
      },
      error => {
        this.isLoading = false;
        console.warn("oninit error", error);
      }
    );
  }

  search(): void {
    if (!this.searchTerm) {
      this.filteredServices = this.services;
    } else {
      this.filteredServices = this.services.filter(service =>
        service.service_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.search();
  }

  getServiceDetails(serviceName: string) {
    this.router.navigate(['/route-service', serviceName]);
  }



}
