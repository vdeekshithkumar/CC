import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditProfileService } from './edit-profile.service';
import { Observable, Subscriber } from 'rxjs';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit{
  editprofileForm!:FormGroup;
  title = 'imgtobase64';
  myimage!: Observable<any>;
  base64code!: any
  constructor(private formBuilder: FormBuilder,private router:Router,private editProfileService:EditProfileService){

  }
  ngOnInit(): void {
    this.editprofileForm = this.formBuilder.group({
     company_id:['',Validators.required],
      name: ['', Validators.required],
      licence_id: ['11', Validators.required],
      domain_address: ['', Validators.required],
      // company_logo: ['', Validators.required],
      company_location: ['', Validators.required],
      country: ['india', Validators.required],
      rating:['', Validators.required],
      address: ['', Validators.required],
      });
  }
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file)
  };
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      console.log(d)
      this.myimage = d
     this.editprofileForm.get('company_logo')?.setValue(d.split(',')[1]);
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
  // onEdit(){
  //   this.editProfileService.edit(this.editprofileForm.value).subscribe(
  //     (response)=>{
  //       console.log(response);
  //       this.router.navigate(['/profile'])
  //     },
  //     (error)=>{
  //       console.log('error',error);
  //     }
  //     );
  
  // }
  onEdit(){
    this.editProfileService.updatecompany(this.editprofileForm.value)  
                .subscribe((data) => {  
                    this.router.navigate(['/dashboard']);
                    // this.resetForm();  
                })  
              }
            
  
  GetAllCompany() {
    throw new Error('Method not implemented.');
  }
  // onEdit(companyId:number){
  //   this.editProfileService.getCompanyById(companyId).subscribe(data=>{
      
  //     this.editProfileService.patchValue(data);
  //   })
  // resetForm(){
  //   this.editprofileForm.value.company_id=''
  //   this.editprofileForm.value.name=''
  //   this.editprofileForm.value.domain_address=''
  //   this.editprofileForm.value.rating=''
  //   this.editprofileForm.value.address=''
  // }
}
