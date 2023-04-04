import { Component, OnInit } from '@angular/core';
import { UploadInventoryservice } from './upload-inventory.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-inventory',
  templateUrl: './upload-inventory.component.html',
  styleUrls: ['./upload-inventory.component.css']
})
export class UploadInventoryComponent {
 
  UploadInventoryForm!: FormGroup;
    form: any;
    port_name="";
    port_list:any;
  
    constructor(private formBuilder: FormBuilder,private router:Router,private uploadInventoryservice:UploadInventoryservice){
      
     }
  ngOnInit(): void {
    this.UploadInventoryForm = this.formBuilder.group({
      inventory_id:['8'],
      date_created:['2023-03-28'],
      last_modified:['2023-03-28'],
      company_id:['1'],
      container_type:['',Validators.required],
      available: ['', Validators.required],
      maximum: ['', Validators.required],
      minimum:['', Validators.required],
      port_id:['',Validators.required],
      updated_by:['4'],
    });

    this.uploadInventoryservice.getAllPorts().subscribe(
      data => {
        this.port_list = data;
        console.log("Port list fetched: ", this.port_list); 
      },
      error => {
        console.log("ports loading error:" +error);
      }
    );

  }
  

  onSubmit() {
  //   if(this.UploadInventoryForm.valid){
  //    this.router.navigate(['sign-in'])
  //    console.log(this.UploadInventoryForm.value); 
  //  }

  {
    try {
      const response = this.uploadInventoryservice.uploadInventory(this.UploadInventoryForm.value).toPromise();
      console.log(response);
      console.log(this.UploadInventoryForm.value)
      this.router.navigate(['/dashboard']);
    } 
    catch (error) {
      console.log('Error uploading inventory:', error);
    }

  // }
  //  this.uploadInventoryservice.uploadInventory(this.UploadInventoryForm.value).subscribe(
  //   (response: any)=>{
  //     console.log(response);
  //     this.router.navigate(['/dashboard'])
  //     },

  //      (error: any)=>{
  //       console.log('error',error);
  //    }
  //     );

}
}
}