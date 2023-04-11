import { Component, OnInit } from '@angular/core';
import { UploadInventoryservice } from './upload-inventory.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { filter } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
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
    refrigerated:any;
    ExcelData:any;
    x: any;
    key:any;
    id:any;
    currentUser: any;
    userId: any;
    companyId: any;
    inventoryId: any;
   
  
    constructor(private formBuilder: FormBuilder,private sessionService: SessionService,private router:Router,private uploadInventoryservice:UploadInventoryservice){ 
     }
    
  
    
     ReadExcel(event: any) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const binaryString = e.target.result;
          const workBook = XLSX.read(binaryString, { type: 'binary' });
          const sheetNames = workBook.SheetNames;
          if (sheetNames && sheetNames.length > 0) {
            this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
            this.ExcelData.forEach((row: any) => {
              const newRow: any = {};
              Object.keys(row).forEach((key: string) => {
                const newKey = key.toLowerCase().replace(/ /g, '_');
                const value = row[key].toString().toLowerCase().replace(/ /g, '_');
                newRow[newKey] = value;
              });
              this.ExcelData[this.ExcelData.indexOf(row)] = newRow;
            });
            console.log(this.ExcelData);
            this.setV();
          } else {
            console.error('No sheets found in uploaded Excel file');
          }
        } else {
          console.error('Uploaded file is empty');
        }
      }
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
    //get company id from session
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        console.log('company ID is :', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );

// get inventory id from session
// this.sessionService.getInventoryId().subscribe(
//   (inventoryId: number) => {
//     this.inventoryId = inventoryId;
//     console.log('inv  ID is :', inventoryId);
//   },
//   (error: any) => {
//     console.error('Error retrieving inventory ID:', error);
//   }
// );

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // get date in format yyyy-mm-dd
    this.UploadInventoryForm = this.formBuilder.group({
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


    //session 
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
      
    });

   
   

    //when navigate back to sign-in session ends
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && event.url === '/sign-in')
    ).subscribe(() => {
      this.sessionService.clearSession();
    });

  }

  logout(): void {
    // clear session data and redirect to login page
    this.sessionService.clearSession();
  }
   private setV(){
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // get date in format yyyy-mm-dd
    this.UploadInventoryForm.setValue({
  
      inventory_id:8,
      date_created:"2023-07-28T00:00:00",
      last_modified:formattedDate,
      company_id:this.companyId,
      container_type:this.ExcelData[0].container_type,
      available: this.ExcelData[0].available,
      maximum: this.ExcelData[0].maximum,
      minimum: this.ExcelData[0].minimum,
      port_id: this.ExcelData[0].port_id,
      updated_by:this.userId,
      container_size: this.ExcelData[0].container_size
      
  
    });
//  


    // console.log('session id retrieved  '+this.session_user_id)
    
  }



  deleteInventory(id: number) {
    this.uploadInventoryservice.deleteInventory(id)
      .subscribe(
        (        data: any) => {
          console.log(data);
           this.router.navigateByUrl('/upload-inventory', { skipLocationChange: true });
          this.router.navigate(['/upload-inventory']);
           window.location.reload()
          // this.getAllInventory()
        },
        (        error: any) => console.log(error));
  }
  // editInventory(id: number) {
  //   this.uploadInventoryservice.editInventory(id)
  //     .subscribe(
  //       (        data: any) => {
  //         console.log(data);
  //          this.router.navigateByUrl('/upload-inventory', { skipLocationChange: true });
  //         this.router.navigate(['/upload-inventory']);
  //          window.location.reload()
  //         // this.getAllInventory()
  //       },
  //       (        error: any) => console.log(error));
  // }


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
  } 
  catch (error) {
    console.log('Error uploading inventory:', error);
    console.log(this.UploadInventoryForm.value);
  }
}

}
