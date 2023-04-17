import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditProfileService } from './edit-profile.service';
import { Observable, Subscriber } from 'rxjs';
import { ProfileComponent } from '../profile.component';
import { SessionService } from 'src/app/session.service';

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
  productImage: any;
  companyId:any;
  companyName:any;
  company_logo:any;
  licenceId:any;
  constructor(private sessionService: SessionService, profileComponent:ProfileComponent,private formBuilder: FormBuilder,private router:Router,private editProfileService:EditProfileService){
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
    this.editprofileForm = this.formBuilder.group({
     company_id:this.companyId,
     name:['mnnm', Validators.required],
      licence_id:['56', Validators.required],
      domain_address: ['mnnm', Validators.required],
      company_logo: [''],
      company_location: ['kjbnbs', Validators.required],
      country: ['snbn', Validators.required],
      rating:['9', Validators.required],
      address: ['kjsksk', Validators.required],
      });
      // const userData = sessionStorage.getItem('userData');
      // if (userData) {
      //   const data = JSON.parse(userData);
      //   // Set the retrieved data to the form controls
      //   this.editprofileForm.patchValue({
      // company_id:this.companyId,
    
  }
  onCancel() {
    // Call the reset method on the form group to reset the form
    this.editprofileForm.reset();
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
      debugger;
      console.log(d)
      this.myimage = d
     this.editprofileForm.get('company_logo')?.setValue(d.split(',')[1]);
     console.log(this.editprofileForm);
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
  
  UploadImage(image: any) {
    this.productImage = image;
  }

  async onEdit(){
    debugger;
    let base64String=this.myimage
    const obj = Object.freeze({
      base64String: base64String
    });
    this.editprofileForm.value.company_logo = base64String;
    const response = await this.editProfileService.updatecompany(this.companyId,this.editprofileForm.value).toPromise();
    console.log('edit'+response)
    await this.router.navigateByUrl('profile',{skipLocationChange:true});
    await this.router.navigate(['profile']);
    await window.location.reload();
 }
  
  GetAllCompany() { 
    throw new Error('Method not implemented.');
  }  
}
