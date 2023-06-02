import { Component, OnInit } from '@angular/core';
import { UploadInventoryservice } from './upload-inventory.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx'
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { filter, map } from 'rxjs';
import { NumberSymbol } from '@angular/common';


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
    searchPortId: any;
    port_list:any;
    container_type="";
    inventory_list=null;
    records:any[]=[];
    inventory_list_by_companyId: any[] = [];
    refrigerated:any;
    ExcelData:any;
    itemsPerPage: number = 8;
    currentPage: number = 1;
    x:any;
    emailValue: string = '';
    showModal=false;
    key:any;
    id:any;
    inv_id:any;
    isEdit:any=0;
    currentUser: any;
    userId: any;
    companyId: any;
    inventoryId: any;
    inventory_data: any;
    port_id: any;
    y:any=0;
    searchTerm:any;
  
    constructor(private formBuilder: FormBuilder,private sessionService: SessionService,private router:Router,private uploadInventoryservice:UploadInventoryservice){ 
     }
     addExcel(): void {

          if(this.y==1){
            this.uploadInventoryservice.sendExcelData(this.ExcelData,this.userId,this.companyId)
            .subscribe(
              response => {
                console.log('Excel data sent successfully:', response);
                this.y=0;
                window.location.reload()
              },
              error => {
                console.error('An error occurred while sending Excel data:', error);
              }
            );
          }
          else{
          alert("no suceed")
          }
}
  
OnSetY(){
  debugger
  this.y=1;
  this.showModal=false;
  console.log("this is excel d"+JSON.stringify(this.ExcelData))
this.addExcel();
}


ReadExcel(event: any) {
  const file = event.target.files[0];
  const fileType = file.type;
  if (fileType !== "application/vnd.ms-excel" && fileType !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    alert("Please upload a valid Excel file");
    
    return;
  }

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
            console.log("this is the list of excel"+this.ExcelData);
          this.showModal=true;
          }
          else {

            alert("no sheets found")
            console.error('No sheets found in uploaded Excel file');
          }
              
    } else {
      alert("Uploaded file is empty");
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

    this.uploadInventoryservice.getInventoryByIdCID(this.companyId).subscribe(
      data => {
        this.inventory_list_by_companyId = data;
        console.log("inv list by company id is fetched: ", this.inventory_list_by_companyId); 
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
      
    })
    //when navigate back to sign-in session ends
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && event.url === '/sign-in')
    ).subscribe(() => {
      this.sessionService.clearSession();
    });

  }
  back()
  {
    window.location.reload()
  }


  logout(): void {
    // clear session data and redirect to login page
    this.sessionService.clearSession();
  }
  
  //  private setV(){
  //   const now = new Date();
  //   const formattedDate = now.toISOString().split('T')[0]; // get date in format yyyy-mm-dd
  //   this.UploadInventoryForm.setValue({
      
  //     inventory_id:8,
  //     date_created:"2023-07-28T00:00:00",
  //     last_modified:formattedDate,
  //     company_id:this.companyId,
  //     container_type:this.ExcelData[0].container_type,
  //     available: this.ExcelData[0].available,
  //     maximum: this.ExcelData[0].maximum,
  //     minimum: this.ExcelData[0].minimum,
  //     port_id: this.ExcelData[0].port_id,
  //     updated_by:this.userId,
  //     container_size: this.ExcelData[0].container_size
      
  
  //   });
    
  // }

  
get totalPages(): number {
  return Math.ceil(this.inventory_list_by_companyId.length / 8);
}
prevPage() {

  if (this.currentPage > 1) {
    this.currentPage--;
  }
  
   }
   nextPage() {
    if (this.currentPage < Math.ceil(this.inventory_list_by_companyId.length / this.itemsPerPage)) {
      this.currentPage++;
    }
  
   }
   backPage(){
    this.router.navigate(['forecast-map']);
   }



  getInventoryById(inv_id: number) {
  
    this.uploadInventoryservice.getInventoryById(inv_id)
      .subscribe(
        (        data: any) => {
       
          this.inventory_data = data;
        
          console.log("single inventory received"+this.inventory_data);
          // console.log(this.inventory_data.inventory_id);
      
          this.editI(inv_id);

        },
        (        error: any) => console.log(error));
  }


  editI(inv_id:number){
    // const parsedData = JSON.parse(this.inventory_data);

    console.log('inventory id is    shis' + inv_id)

    console.log(this.isEdit)
    
    this.isEdit=1;
    console.log('now turned '+this.isEdit)
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // get date in format yyyy-mm-dd
   
    this.UploadInventoryForm.setValue({
  
      inventory_id:inv_id,
      date_created:"2023-03-28",
      last_modified:formattedDate,
      company_id:this.companyId,
      container_type:this.inventory_data.container_type,
      available: this.inventory_data.available,
      maximum: this.inventory_data.maximum,
      minimum:this.inventory_data.minimum,
      port_id:this.inventory_data.port_id,
      updated_by:this.userId,
      container_size:this.inventory_data.container_size

    });
  }

 
//   getSortedInventoryList(searchPortId:number) {
//     if (this.searchPortId) { 
    
// const data = JSON.parse(this.inventory_list_by_companyId);

// const filteredData = [];

// for (const obj of data) {
//   if (obj.port_id == searchPortId) {
//     filteredData.push(obj);
//   }
// }

// console.log(filteredData); 
//     }
//   }
   
    //   const data = JSON.parse(this.inventory_list_by_companyId);
    //   // const filteredData = data.filter((obj: { port_id: any; }) => obj.port_id === this.searchPortId);
    //   // const filteredJsonData = JSON.stringify(filteredData);
    //   // console.log(filteredJsonData);
    //   // console.log(filteredData+"non stringyfied")
    //   console.log(data)
    

    // } else {
    //   return this.inventory_list_by_companyId;
     
    // }

    //


// Search(){
//   debugger
//   if(this.port_id==""){
//     this.ngOnInit();
//   }
//   else{
//     this.inventory_list_by_companyId=this.inventory_list_by_companyId.filter((res: { port_id: string; })=>{
//       return res.port_id.match(this.port_id);
//     });
//   }
// }
    

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

async onSubmit() {
  if(this.isEdit==1){
    if(this.UploadInventoryForm.validator){
      const response = await this.uploadInventoryservice.editInventory(this.inventory_data.inventory_id,this.UploadInventoryForm.value).toPromise();
      console.log('edit'+response)
      this.isEdit=0
      this.UploadInventoryForm.reset();
      await this.router.navigateByUrl('/upload-inventory', { skipLocationChange: true });
      await this.router.navigate(['/upload-inventory']);
      await window.location.reload()
    }
    else{
      alert("please fill the mandatory field");
    }
    
  }
  else{
    if(this.UploadInventoryForm.valid){
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
      else{
        alert("please fill the mandatory field");
      }
    
    }
    
   
  }

}
