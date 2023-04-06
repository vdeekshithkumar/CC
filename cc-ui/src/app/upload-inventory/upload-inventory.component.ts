import { Component, OnInit } from '@angular/core';
import { UploadInventoryservice } from './upload-inventory.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
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
    container_type="";
    inventory_list=null;
    ExcelData:any;
    x: any;
  
    constructor(private formBuilder: FormBuilder,private router:Router,private uploadInventoryservice:UploadInventoryservice){
      
     }

     ReadExcel(event:any) {
      let file = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          let binaryString = e.target.result;
          let workBook = XLSX.read(binaryString, { type: 'binary' });
          let sheetNames = workBook.SheetNames;
          if (sheetNames && sheetNames.length > 0) {
            this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
            console.log(this.ExcelData);
            console.log(this.ExcelData[0].Maximum);
            this.setV()
          } else {
            console.error('No sheets found in uploaded Excel file');
          }
        } else {
          console.error('Uploaded file is empty');
        }
      }
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
      container_size:['',Validators.required]
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

    this.uploadInventoryservice.getAllInventory().subscribe(
      data => {
        this.inventory_list = data;
        console.log("inv list fetched: ", this.inventory_list); 
      },
      error => {
        console.log("inv loading error:" +error);
      }
    );


  }
   private setV(){
    this.UploadInventoryForm.setValue({
  
      inventory_id:8,
      date_created:"2023-03-28",
      last_modified:"2023-03-28",
      company_id:1,
      container_type:"Refrigerated",
      available: this.ExcelData[0].Available,
      maximum: this.ExcelData[0].Maximum,
      minimum: this.ExcelData[0].Minimum,
      port_id: 3,
      updated_by:4,
      container_size: 4
      
  
    });
    
  }

async onSubmit() {
  try {
    const response = await this.uploadInventoryservice.uploadInventory(this.UploadInventoryForm.value).toPromise();
    console.log(response);
    console.log(this.UploadInventoryForm.value);
    // reset the form after successful upload
    this.UploadInventoryForm.reset();
    // reload the component
    await this.router.navigateByUrl('/upload-inventory', { skipLocationChange: true });
    await this.router.navigate(['/upload-inventory']);
    await window.location.reload()
  } catch (error) {
    console.log('Error uploading inventory:', error);
  }
}

}
