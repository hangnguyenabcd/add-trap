import { Component, OnInit } from '@angular/core';
import { TrapdestinationsService } from '../service/trapdestinations.service';
import { Trapdestinations } from '../trap-destinations';
import { SortEvent } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trap-destinations',
  templateUrl: './trap-destinations.component.html',
  styleUrls: ['./trap-destinations.component.css']
})
export class TrapDestinationsComponent implements OnInit {
  trapDes: Trapdestinations[];
  cols: any[]=[];
  isShowDialogDelete = false;
  dataInputDelete = {};

  constructor(private trapDestinationsService: TrapdestinationsService,
    private router: Router) {     console.log('getall');}

  ngOnInit() {
    // this.trapDestinationsService.getCarsSmall().then(res => this.trapDes = res);
    this.cols = [
      { field: 'destinationName', header: 'Destination Name' },
      { field: 'ipAddress', header: 'IP Address' },
      { field: 'portNumber', header: 'Port Number' },
      { field: 'version', header: 'SNMP Trap Version' },
      { field: 'status', header: 'Status' },

    ];
    this.getAll()
  }
  getAll(){
    this.trapDes = this.trapDestinationsService.getAll()
  }
  Delete(Data){
    this.isShowDialogDelete = true;
    this.dataInputDelete = Data;
  }
  setIsShowConrfirm(event){
    this.isShowDialogDelete = event;
  }
}
