import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empSearch'
})
export class EmpSearchPipe implements PipeTransform {
  transform(value: any[], searchTerm: string): any {
    if (!value) return null;
    if (!searchTerm) return value;

    const filteredArray = value.filter(item => {
      const fname = item.fname?.toString().toLowerCase();
      const lname = item.lname?.toString().toLowerCase();
      const email = item.email?.toString().toLowerCase();

      if ((fname && fname.includes(searchTerm)) || (email && email.includes(searchTerm))) {
        return true;
      }

      return false;
    });

    return filteredArray;
  }
}
