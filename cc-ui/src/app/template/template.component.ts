import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UploadInventoryservice } from '../upload-inventory/upload-inventory.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css','../app.component.css']
})
export class TemplateComponent {
  constructor(private router: Router,private uploadInventoryservice:UploadInventoryservice) { }
  inventory_list_by_companyId: any[] = []; 
  companyId: any;
  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

  ngOnInit(): void{
    this.uploadInventoryservice.getInventoryByIdCID(this.companyId).subscribe(
      data => {
        this.inventory_list_by_companyId = data;
        console.log("inv list by company id is fetched: ", this.inventory_list_by_companyId); 
      },
      error => {
        console.log("inv loading error:" +error);
      }
    );
  }
}

