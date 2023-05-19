import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform(
    value: any[],
    args?: any,
    getPortName?: (port_id: number) => string
  ): any {
    if (!value) return null;
    if (!args) return value;

    const searchTerm = args.toString().toLowerCase();
    const isNumberSearch = !isNaN(parseFloat(searchTerm)) && isFinite(searchTerm);
    const excludedKeys = ['company_id', 'inventory_id', 'updated_by', 'container_size', 'last_modified', 'available', 'maximum', 'minimum', 'date_created']; // array of keys to exclude

    var filteredArray = value.filter(item => {
      for (const prop in item) {
        if (item.hasOwnProperty(prop) && !excludedKeys.includes(prop)) { // check if the property is not excluded
          const propValue = item[prop];
          const propType = typeof propValue;

          if (propType === 'string') {
            const propValueLowerCase = propValue.toString().toLowerCase();
            if (propValueLowerCase.startsWith(searchTerm.charAt(0)) && propValueLowerCase.includes(searchTerm)) {
              return true;
            }
          } else if (propType === 'number' && isNumberSearch) {
            if (propValue.toString().includes(searchTerm)) {
              return true;
            }
          } else if (prop === 'port_id' && getPortName) {
            const portName = getPortName(item[prop]);
            if (portName.toLowerCase().includes(searchTerm)) {
              return true;
            }
          }
        }
      }
      return false;
    });
    return filteredArray;
  }
}