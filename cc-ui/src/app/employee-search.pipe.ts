import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empSearch'
})
export class EmpSearchPipe implements PipeTransform {

 
  transform(value: any[], args?: any): any {
    if(!value) return null;
    if(!args) return value;
    const searchTerm = args.toString().toLowerCase();
    const filteredArray = value.filter(item => {
      const fname = item.fname?.toString().toLowerCase(); // use optional chaining to avoid errors if fname is null or undefined
      const email = item.email?.toString().toLowerCase(); // use optional chaining to avoid errors if email is null or undefined
      if ((fname && fname.includes(searchTerm)) || (email && email.includes(searchTerm))) {
        return true;
      }
      return false;
    });
    return filteredArray;
  }
 
  }

