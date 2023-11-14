import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderFilterComponent } from '../order-filter/order-filter.component';
import { OrdersComponent } from '../orders/orders.component';
import { Filter } from '../../model/filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  /** A reference which is needed to pass filter values to the component. **/
  @ViewChild(OrdersComponent) ordersComponent?: OrdersComponent;

  constructor(private router: Router,
              private dialog: MatDialog) {}


  /**
   * This method displays a modal which allows the user to select / deselect
   * various filters for the orders.
   */
  filterOrders(): void {

        // Display the order filter dialog 
        let dialogRef = this.dialog.open(OrderFilterComponent);

        dialogRef.afterClosed().subscribe(response => {
          if (response && Array.isArray(response)) {
            // The user wants to apply a filter(s) and the component has
            // returned an array of those filters. Let's pass the filters
            // to the orders component.
            this.ordersComponent!.filters = <Filter[]>response;
          }
        })
  }

  /**
   * This method redirects the user to the order page when the new
   * order button is clicked.
   */
  newOrder(): void {
    this.router.navigate(['/order']);
  }

}
