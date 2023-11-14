import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../model/order';
import { ConflictError } from '../../errors/conflict-error';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {

  /** Define the order form and its controls. */
  orderForm = this.fb.group({
    tableNumber: [null, Validators.required],
    size: [null, Validators.required],
    crust: [null, Validators.required],
    flavor: [null, Validators.required]
  });

  /** Define getters to provide easier access to the controls. */
  get tableNumber() { return this.orderForm!.get('tableNumber'); }
  get size() { return this.orderForm.get('size'); }
  get crust() { return this.orderForm.get('crust'); }
  get flavor() { return this.orderForm.get('flavor'); }

  /** The snackbar configuration. */
  private snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  }

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private ordersService: OrdersService) { }

  /**
   * This method attempts to create a new order using 
   * the contents of the order form.
   */
  onSubmit() {

    // The user wants to make an order, so construct the
    // order object using the form data and call the service.
    let order: Order = {
      Table_No: this.tableNumber!.value!,
      Size: this.size!.value!,
      Crust: this.crust!.value!,
      Flavor: this.flavor!.value!
    }
    
    this.ordersService.createOrder(order).subscribe( {

      // Redirect the user to the home page upon successful order creation.
      next: () => {
        this.router.navigate(['/']);
      },

      // Display the appropriate error message when the user was unable to 
      // create the order.
      error: (error: Error) => {

        if (error instanceof ConflictError) {
          this.snackBar.open('An order for this table already exists. Please try again with a different table number.', undefined, this.snackBarConfig);
        }
        else {
          console.error('Encountered the following error when attempting to create order: ' + JSON.stringify(error));
          this.snackBar.open('There was a problem completing your request. Please try again.', undefined, this.snackBarConfig);
        }
      }
    });
    

  }

}
