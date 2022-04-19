import { Component } from '@angular/core';


@Component({
  selector: 'app-gender-renderer',
  template: `
    <span> {{ value }} 
  `,
})
export class GenderCellRenderer  {
  
  public value: any;

  agInit(params): void {
    const image = params.value === 1 ? 'monthy' : 'Quarterly';
   
    this.value = params.value;
  }
}