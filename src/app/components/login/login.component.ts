import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Authentication } from '../../model/authentication';
import { UnauthorizedError } from '../../errors/unauthorized-error';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * This component implements a login form which uses the AuthenicationService
 * to authenticate the user
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  /** Define the login form and it's two controls. */
  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  /** Define getters to provide easier access to the controls. */
  get username() { return this.loginForm!.get('username'); }
  get password() { return this.loginForm.get('password'); }

  /** The snackbar configuration. */
  private snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  }

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  /**
   * This method attempts to login the user using the validated 
   * username and passwored entered by the user.
   */
  onSubmit() {
    // Attempt to login when the user submits the form.
    this.login(this.username!.value!, this.username!.value!);
  }

  /**
   * This method uses the AuthenticationService to send a request to the 
   * API. 
   * 
   * On success, the user is redirected to the home page. An error message
   * will be displayed upon any type of error.
   * 
   * @param username 
   * @param password 
   */
  private login(username: string, password: string) {

    this.authenticationService.login(username, password).subscribe( {

      // Redirect the user to the home page upon successful authentication.
      next: (authentication: Authentication) => {
        this.router.navigate(['/']);
      },

      // Display the appropriate error message when the user was unable to 
      // login to the application.
      error: (error: Error) => {
        if (error instanceof UnauthorizedError) {
          this.snackBar.open('Invalid username or password. Please try again.', undefined, this.snackBarConfig);
        }
        else {
          console.error('Encountered the following error when attempting to login: ' + JSON.stringify(error));
          this.snackBar.open('There was a problem completing your request. Please try again.', undefined, this.snackBarConfig);
        }
      }
    });

  }
}
