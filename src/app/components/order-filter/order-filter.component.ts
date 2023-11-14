import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Filter } from '../../model/filter';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrl: './order-filter.component.scss'
})
export class OrderFilterComponent {

    /** Define the filter form and its controls. */
    filterForm = this.fb.group({
      size: [null],
      crust: [null],
      flavor: [null]
    });

  /** Define getters to provide easier access to the controls. */
  get size() { return this.filterForm.get('size'); }
  get crust() { return this.filterForm.get('crust'); }
  get flavor() { return this.filterForm.get('flavor'); }

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<OrderFilterComponent>) { }
                        
  get filters(): Filter[] {

    // Construct the filter objects based upon what's been entered
    // in the form.
    let filters: Filter[] = [];
    if ((this.size?.value) && (this.size.value !== 'No Selection')) {
      filters.push({type: 'Size', value: this.size.value});
    }
    if ((this.crust?.value) && (this.crust.value !== 'No Selection')) {
      filters.push({type: 'Crust', value: this.crust.value});
    }
    if ((this.flavor?.value) && (this.flavor.value !== 'No Selection')) {
      filters.push({type: 'Flavor', value: this.flavor.value});
    }

    return filters;
  }
}
