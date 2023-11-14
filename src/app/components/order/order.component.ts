import { Component, Input } from '@angular/core';
import { Order } from '../../model/order';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { OrdersService } from '../../services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../util/confirmation/confirmation.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

  /** The order passed from the parent OrdersComponent. */
  @Input()
  order: Order = {};

  /** The snackbar configuration. */
  private snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  }

  constructor (private dialog: MatDialog,
               private snackBar: MatSnackBar,
               private ordersService: OrdersService) {}

  /**
   * This method displays a confirmation dialog to the user to confirm whether
   * they want to cancel the order.
   */
  confirmCancelOrder() {

    // Display a confirmation dialog 
    let dialogRef = this.dialog.open(ConfirmationComponent);

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        // The user confirmed the action, so go ahead and cancel the order.
        this.cancelOrder();
      }
    })
  }

  /**
   *  This method uses the OrdersService to cancel (i.e. delete) an order
   */
  cancelOrder() {
    
    this.ordersService.deleteOrder(this.order.Order_ID!).subscribe( {

      // Display an error message to the user.
      error: (error: Error) => {
        console.error('Encountered the following error when attempting to delete the order: ' + JSON.stringify(error));
        this.snackBar.open('There was a problem completing your request. Please try again.', undefined, this.snackBarConfig);
      }
    })

  }

}
