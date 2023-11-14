import { Component, OnInit } from '@angular/core';
import { Order } from '../../model/order';
import { OrdersService } from '../../services/orders.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Filter } from '../../model/filter';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  /** Stores any filters to be used by the component. */
  private _filters: Filter[] = [];

  set filters(filters: Filter[]) {
    this._filters = filters;
  }

  /** The snackbar configuration. */
  private snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  }

  constructor (private snackBar: MatSnackBar,
               private ordersService: OrdersService) {}
  

  /**
   * This method is called during component intialization and retrieves the
   * orders to be displayed by the component.
   */
  ngOnInit(): void {

    this.getOrders();
  }

  /** This getter method returns the current orders matching the currently 
   *  selected filters.
   */
  get filteredOrders(): Order[] {

    return this.ordersService.orders.filter( (order: Order) => {
    
      // For each item, loop over the filters to see if they all
      // match.
      let match = true;
      for (let filter of this._filters) {
        if (filter.type === 'Size' && filter.value !== order.Size) {
          match = false;
          break;
        } 
        if (filter.type === 'Crust' && filter.value !== order.Crust) {
          match = false;
          break;
        } 
        if (filter.type === 'Flavor' && filter.value !== order.Flavor) {
          match = false;
          break;
        } 
      }

      return match;
    });
  }


  /** This method retrieves the orders from the server and applies
   *  the current filters
   */
  private getOrders() {

    this.ordersService.getOrders().subscribe( {

      // Display an error message to the user.
      error: (error: Error) => {
        console.error('Encountered the following error when attempting to retreive the orders: ' + JSON.stringify(error));
        this.snackBar.open('There was a problem completing your request. Please try again.', undefined, this.snackBarConfig);
      }
    });

  }


}
