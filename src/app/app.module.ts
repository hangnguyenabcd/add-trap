import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RbnCommonLibModule } from 'rbn-common-lib';

import { AppComponent } from './app.component';
import { MenubarComponent } from './menubar/menubar.component';
import { TrapDestinationsComponent } from './trap-destinations/trap-destinations.component';
import { AddTrapDestinationsComponent } from './add-trap-destinations/add-trap-destinations.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    TrapDestinationsComponent,
    AddTrapDestinationsComponent,
    DialogDeleteComponent
  ],
  imports: [
    RbnCommonLibModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule,
    TableModule,
    HttpClientModule,
    CodeHighlighterModule,
    TabViewModule,
    ContextMenuModule,
    PanelMenuModule,
    MenubarModule,
    ButtonModule,
    PaginatorModule,
    BreadcrumbModule,
    InputSwitchModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    DialogModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
