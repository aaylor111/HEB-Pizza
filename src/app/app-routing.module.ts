import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/util/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { authGuard } from './guards/auth.guard'


const routes: Routes = [

  /** Routes for the login pages. */
  {path: 'login', component: LoginComponent},

  /** Routes for the main application pages. */
  {path: '', component: LayoutComponent,
    children: [
      {path: '',  component: HomeComponent, canActivate:[authGuard]},
      {path: 'order',  component: OrderFormComponent, canActivate:[authGuard]},

    ]
  },

  /** Routes for error pages. */
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
