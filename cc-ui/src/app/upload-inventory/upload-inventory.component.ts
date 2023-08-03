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
import { DialogComponent } from '../dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewOtherAdsService } from '../view-other-ads/view-other-ads.service';
export interface Containers {
  container_type_id: number;
  type: string;
  capacity: number;


}
export interface Inventory {
  port_name:string;
  port_id: number;
  container_type: string;
  container_size: number;
  available: number;
  surplus: number;
  deficit: number;
  // Add other properties if necessary
}
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
    formHeading: string = 'Add New Inventory';
    port_name="";
    inv:Inventory[]=[]
    searchPortId: any;
    port_list:any;
    condata:any;
    container_type="";
    inventory_list=null;
    records:any[]=[];
    inventory_list_by_companyId: any[] = [];
    refrigerated:any;
    ExcelData:any;
     Einv: Inventory[] = [];
     container_list: Containers[] = [];
     container_type_list:Containers[]=[];
    showForm: boolean = false;
    isClicked:boolean=false
    itemsPerPage: number = 7;
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
    showValidationErrors: boolean = false;
    constructor(private snackBar: MatSnackBar,private formBuilder: FormBuilder,private sessionService: SessionService,private dialog: MatDialog,private router:Router,private uploadInventoryservice:UploadInventoryservice,private viewotherAds: ViewOtherAdsService){ 
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
    this.viewotherAds.getAllContainers().subscribe(
      (condata: Containers[]) => {
        // Filter out duplicate values based on capacity
        const uniqueContainers = condata.filter((container, index, self) =>
          index === self.findIndex((c) => c.capacity === container.capacity)
        );
        const uniqueContainertypes = condata.filter((container, index, self) =>
        index === self.findIndex((c) => c.type === container.type)
      );
  
        this.container_list = uniqueContainers;
        this.container_type_list = uniqueContainertypes;
        console.log(JSON.stringify(this.container_list));
      }
    );
   

    const now = new Date();
  const formattedDateTime = now.toISOString();
  console.log(formattedDateTime); // get date in format yyyy-mm-dd
    this.UploadInventoryForm = this.formBuilder.group({
      inventory_id:['8'],
      date_created:formattedDateTime,
      last_modified:formattedDateTime,
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
  

  

getPortName(portId: number): string {
  const port = this.port_list.find((p: { port_id: number, port_name: string }) => p.port_id === portId);
  return port ? port.port_name : '';
}
prevPage() {
  if (this.currentPage > 1) {
    this.currentPage = this.currentPage - 1;
  }
}
nextPage() {
  const totalPages = Math.ceil(this.inventory_list_by_companyId.length / this.itemsPerPage);
  if (this.currentPage < totalPages) {
    this.currentPage = this.currentPage + 1;
  }
}
   backPage(){
    this.router.navigate(['forecast-map']);
   }



  getInventoryById(inv_id: number) {
    debugger
    this.uploadInventoryservice.getInventoryById(inv_id)
      .subscribe(
        (        data: any) => {
       
          this.inventory_data = data;
        
          console.log("single inventory received"+this.inventory_data);
          // console.log(this.inventory_data.inventory_id);
      
          this.editI(inv_id);

        },
        (        error: any) => console.log(error));
        this.showForm = true;
  }


  editI(inv_id:number){
    debugger
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
    debugger;
    const timerDuration = 1000;
    if (this.isEdit == 1) {
      if (this.UploadInventoryForm.valid) {
        debugger;
        const response = await this.uploadInventoryservice.editInventory(this.inventory_data.inventory_id, this.UploadInventoryForm.value).toPromise();
        console.log('edit' + response);
        this.isEdit = 0;
        this.UploadInventoryForm.reset();
        await this.router.navigateByUrl('/upload-inventory', { skipLocationChange: true });
        await this.router.navigate(['/upload-inventory']);
        await window.location.reload();
      } else {
        this.snackBar.open('All fields are mandatory', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    }
  else{
    debugger
    if(this.UploadInventoryForm.valid){
      try {
        debugger
        const response = await this.uploadInventoryservice.uploadInventory(this.UploadInventoryForm.value).toPromise();
        console.log(response);
        console.log(this.UploadInventoryForm.value);
        // reset the form after successful upload
        this.UploadInventoryForm.reset();
        
        // reload the component
        await this.router.navigateByUrl('/upload-inventory', { skipLocationChange: true });
        this.snackBar.open('Inventory Uploaded Successully', 'OK', {
          duration: 3000,
               verticalPosition: 'top',
        });
  
        await this.router.navigate(['/upload-inventory']);
       
        setTimeout(() => {
          location.reload();
        }, timerDuration);
      } 
      catch (error) {
        console.log('Error uploading inventory:', error);
        console.log(this.UploadInventoryForm.value);
        }
      }  
      else{
        this.snackBar.open('All fields are mandatory', 'OK', {
          duration: 4000,
               verticalPosition: 'top',
        });

      }
    
    }
    
   
  }
  onExportClick(): void {
    this.uploadInventoryservice.getInventoryByIdCID(this.companyId).subscribe(
      (data: Inventory[]) => {
        this.Einv = data.map((item: Inventory) => {
          const portName = this.getPortName(item.port_id);
          return { ...item, port_name: portName };
        });
        console.log("This is Einv with port names:", this.Einv);
        this.onExport();
      },
      error => console.log(error)
    );
  }
  
 onExport(){
  const worksheetName = 'Inventory';
  const excelFileName = 'Inventory.xlsx';
  const header = ['Port Name','Container Type','Container Size','Available','Surplus','Deficit'];
  const data = this.Einv.map((iv) => [iv.port_name,iv.container_type,iv.container_size,iv.available,iv.surplus,iv.deficit]);

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
   const columnWidths = [
    { wch: 15 }, // Port Name width: 20
    { wch: 15 }, // Container Type width: 15
    
  ];

  // Apply column widths to worksheet
  worksheet['!cols'] = columnWidths;

  XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
  XLSX.writeFile(workbook, excelFileName);
}
  clearSearch(): void {
    this.searchTerm = '';
  }
  showClearButton() {
    const clearButton = document.getElementById("clearButton");
    if (clearButton) {
      clearButton.style.display = "inline-block";
    }
  }
  hideClearButton() {
    const clearButton = document.getElementById("clearButton");
    if (clearButton) {
      clearButton.style.display = "none";
    }
  }
  get totalPages(): number {
    return Math.ceil(this.inventory_list_by_companyId.length / this.itemsPerPage);
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
  toggleFormOpen(){
    this.isClicked = !this.isClicked;
    this.formHeading = this.isEdit ? 'Edit Inventory' : 'Add Inventory';
  }
  updateFormHeading(heading: string) {
    this.formHeading = heading;
  }
  
  closeForm() {
    this.showForm = false;
  }
  resetForm(formGroup: FormGroup) {
    formGroup.reset(); // Reset the form group to its initial state
  }
  openErrorDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        message: message
      }
    });
  }

}
