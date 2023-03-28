import { Component } from '@angular/core';
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
  
    constructor(private formBuilder: FormBuilder,private router:Router,private uploadInventoryservice:UploadInventoryservice)
     {
     }
  ngOnInit(): void {
    this.UploadInventoryForm = this.formBuilder.group({
      InventoryId:['10'],
      DateCreated:['2023-03-28'],
      LastModified:['2023-03-28'],
      CompanyId:['10'],
      ContainerType:['',Validators.required],
      Available: ['', Validators.required],
      M: ['', Validators.required],
      N:['', Validators.required],
      PortId:['10'],
      UpdatedBy:['10'],
    });
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
      this.router.navigate(['dashboard']);
    } 
    catch (error) {
      console.log('Error uploading inventory:', error);
    }
  // }
  //  this.uploadInventoryservice.uploadInventory(this.UploadInventoryForm.value).subscribe(
  //   (response: any)=>{
  //     console.log(response);
  //     this.router.navigate(['sign-in'])
  //     },
  //      (error: any)=>{
  //       console.log('error',error);
  //    }
  //     );
}
}
}