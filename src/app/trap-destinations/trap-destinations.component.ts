import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrapdestinationsService } from '../service/trapdestinations.service';
import { Trapdestinations } from '../trap-destinations';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-trap-destinations',
  templateUrl: './trap-destinations.component.html',
  styleUrls: ['./trap-destinations.component.css']
})
export class TrapDestinationsComponent implements OnInit {
  trapDes: Trapdestinations[];
  cols: any[]=[];
  isShowDialogDelete = false;
  isShowDialogUpdate = false;
  dataInputDelete = {};

  constructor(private trapDestinationsService: TrapdestinationsService,
    private router: Router, private messageService: MessageService) {}

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
  // getAll(){
  //   this.trapDes = this.trapDestinationsService.getAll()
  // }
  getAll() {
    this.trapDestinationsService.getAll().subscribe(res => {
      console.log(res);
      this.trapDes = res
    })
  }
  delete(data: Trapdestinations){
    this.isShowDialogDelete = true;
    this.dataInputDelete = data;
  }

  setIsShowConrfirm(event: boolean){
    this.isShowDialogDelete = event;
    if(event){
      this.isShowDialogDelete = false;
      this.messageService.add({severity: 'info', summary: 'Infor', detail: 'Snmp Destination test has been deleted from VNFM.'});
      this.getAll();
    }
  }

  clearAll(){
    this.messageService.clear();
  }
}
