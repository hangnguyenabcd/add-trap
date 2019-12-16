import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AddTrapDestinationsComponent } from './add-trap-destinations/add-trap-destinations.component'

const routes: Routes = [
  {path:'', component: MenuComponent},
  {path:'add', component: AddTrapDestinationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
