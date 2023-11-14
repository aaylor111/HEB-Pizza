import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressComponent } from './components/util/progress/progress.component';
import { NotFoundComponent } from './components/util/not-found/not-found.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authHeaderInterceptor } from './interceptors/auth-header.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { progressInterceptor } from './interceptors/progress.interceptor';
import { ToolbarComponent } from './components/util/toolbar/toolbar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ConfirmationComponent } from './components/util/confirmation/confirmation.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderFilterComponent } from './components/order-filter/order-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    NotFoundComponent,
    OrderComponent,
    OrdersComponent,
    HomeComponent,
    LoginComponent,
    ToolbarComponent,
    LayoutComponent,
    ConfirmationComponent,
    OrderFormComponent,
    OrderFilterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authHeaderInterceptor, errorInterceptor, progressInterceptor]),)],
  bootstrap: [AppComponent]
})
export class AppModule { }
