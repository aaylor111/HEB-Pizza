import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from '../model/authentication';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';



/**
 * The AuthenticationService provides methods for authenticating the user and maintains the
 * session information used by the application.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated: boolean = false;
  private _authenticationToken?: string;

  constructor(private http: HttpClient) { }

  
  /** This method returns the authentication token when the user has been successfully
   *  authenticated.
   */
  public get authenticationToken(): string | undefined {
    return this._authenticationToken;
  }

  /**
   * This method sends a request to the /auth API in an attempt to validate the 
   * supplied username and password. 
   * 
   * @param username 
   * @param password 
   */
  public login(username: string, password: string): Observable<Authentication> {

    // Construct the URL for the request
    let url: string = environment.pizzaApiUrl + 'auth';

    // Construct the payload for the request.
    let body = {
      username: username,
      password: password
    }

    // Send the request
    return this.http.post<Authentication>(url, body).pipe(

        // Store the authentication token in the service for subsequent requests.
        // An errors will be mapped by the ErrorInterceptor.
        tap( authentication => this._authenticationToken = authentication.access_token)
    )
  }
}