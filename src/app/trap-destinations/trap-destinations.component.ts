import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrapdestinationsService } from '../service/trapdestinations.service';
import { Trapdestinations } from '../trap-destinations';
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-trap-destinations',
  templateUrl: './trap-destinations.component.html',
  styleUrls: ['./trap-destinations.component.css'],
  providers: [MessageService]
})
export class TrapDestinationsComponent implements OnInit {
  trapDes: Trapdestinations[];
  cols: any[]=[];
  isShowDialogDelete = false;
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
  getAll(){
    this.trapDes = this.trapDestinationsService.getAll()
  }
  // getAll() {
  //   this.trapDestinationsService.getAll().subscribe(res => {
  //     this.trapDes = res
  //   })
  // }
  delete(data: Trapdestinations){
    this.isShowDialogDelete = true;
    this.dataInputDelete = data;
  }

  setIsShowConrfirm(event: boolean){
    this.isShowDialogDelete = event;
    this.messageService.add({severity: 'info', summary: 'Info', detail: 'Snmp Destination tesst has been deleted from VNFM.'});
  }
}
