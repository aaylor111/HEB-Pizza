import { Injectable } from '@angular/core';
import { Order } from '../model/order';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

/** This class implements a service which provides the APIs used to manage
 *  orders. It also maintains the orders that were re
 */
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  /** The current orders received from the API. */
  private _orders: Order[] = [];

  get orders(): Order[] {
    return this._orders;
  }

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) { }


  /**
   * This method executes an HTTP GET operation on the "orders" endpoint to retrieve the 
   * current orders.
   * 
   * @returns 
   */
  public getOrders(): Observable<Order[]> {

    // Construct the URL for the request
    let url: string = environment.pizzaApiUrl + 'orders';

    // Construct the headers for the request. Note I could have implemented
    // an interceptor to add the headers, but for lack of time, I chose
    // this approach.
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authenticationService.authenticationToken);

    // Send the request
    return this.http.get<Order[]>(url, {headers: headers}).pipe(

        // Store the orders.
        tap( orders => this._orders = orders)
    )
  }

  /**
   * This method executes an HTTP POST operation on the "orders" endpoint to create a new order.
   * 
   * @param order 
   * @returns 
   */
  public createOrder(order: Order): Observable<Order> {

    // Construct the URL for the request
    let url: string = environment.pizzaApiUrl + 'orders';

    // Construct the headers for the request. Note I could have implemented
    // an interceptor to add the headers, but for lack of time, I chose
    // this approach.
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authenticationService.authenticationToken);

    // Send the request
    return this.http.post<Order>(url, order, {headers: headers}).pipe(

        // We'll add the order to the order array even though it really won't 
        // be used since we'll get a fresh list of orders from the API when the
        // orders page is displayed.
        tap( order => this._orders.push(order))
    )
  }


  /**
   * This method executes an HTTP DELETE operation on the "orders" endpoint to delete the 
   * specified order.
   * 
   * @returns 
   */
  public deleteOrder(orderId: number): Observable<string> {

    // Construct the URL for the request
    let url: string = environment.pizzaApiUrl + 'orders/' + orderId;

    // Construct the headers for the request. Note I could have implemented
    // an interceptor to add the headers, but for lack of time, I chose
    // this approach.
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authenticationService.authenticationToken);

    // Send the request
    return this.http.delete<string>(url, { headers: headers}).pipe(

        // Remove the order since it was succesfully deleted. I'm being careful to update the 
        // existing array instead of replacing it with a new one in order to avoid issues with
        // change detection by the OrdersComponent.
        tap( () => {
          this._orders.forEach( (order, index) => {
            if (order.Order_ID === orderId) this._orders.splice(index,1);
          });
        })      
    )
  }
}
