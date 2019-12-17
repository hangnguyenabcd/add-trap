import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrapDestinationsComponent} from './trap-destinations/trap-destinations.component'
import { AddTrapDestinationsComponent } from './add-trap-destinations/add-trap-destinations.component'
import { AppComponent } from './app.component'

const routes: Routes = [
  {path: '',   redirectTo: '', pathMatch: 'full' },
  {path:'', component: AppComponent},
  {path:'home', component: TrapDestinationsComponent},
  {path:'add', component: AddTrapDestinationsComponent},
  {path:'edit/:id', component: AddTrapDestinationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
