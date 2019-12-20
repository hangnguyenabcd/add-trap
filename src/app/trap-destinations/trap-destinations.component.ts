import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FilterTypes, FieldName } from 'rbn-common-lib';
import { TranslateService } from '@ngx-translate/core';

import { TrapdestinationsService } from '../service/trapdestinations.service';
import { Trapdestinations } from '../trap-destinations';


@Component({
  selector: 'app-trap-destinations',
  templateUrl: './trap-destinations.component.html',
  styleUrls: ['./trap-destinations.component.css']
})
export class TrapDestinationsComponent implements OnInit {
  trapDes: Trapdestinations[] = [];
  colus: any[]=[];
  cols: any[]=[];
  isShowDialogDelete = false;
  dataInputDelete?: any;
  fieldName = FieldName;

  constructor(
    private trapDestinationsService: TrapdestinationsService,
    private messageService: MessageService,
    private router: Router,
    private translate: TranslateService) {
    }

  ngOnInit() {
    // this.colus = [
    //   { field: 'destinationName', header: 'Destination Name' },
    //   { field: 'ipAddress', header: 'IP Address' },
    //   { field: 'portNumber', header: 'Port Number' },
    //   { field: 'version', header: 'SNMP Trap Version' },
    //   { field: 'status', header: 'Status' },

    // ];
    this.cols = [
      {
        field: 'destinationName',
        header: 'Destination Name',
        sort: true,
        colsEnable: true,
        type: FilterTypes.InputText,
        data: [],
        options: {
          model: '',
          usingLink: true
        }
      },
      {
        field: 'ipAddress',
        header: 'Ip Address',
        sort: true,
        colsEnable: true,
        type: FilterTypes.Dropdown,
        data: [],
        options: {
          model: ''
        }
      },
      {
        field: 'portNumber',
        header: 'Port Number',
        sort: true,
        colsEnable: true,
        type: FilterTypes.Dropdown,
        data: [],
        options: {
          model: ''
        }
      },
      {
        field: 'version',
        header: 'SNMP Trap Version',
        sort: true,
        colsEnable: true,
        type: FilterTypes.Dropdown,
        data: [],
        options: {
          model: ''
        }
      },
      {
        field: 'status',
        header: 'Status',
        sort: true,
        colsEnable: true,
        type: FilterTypes.Dropdown,
        data: [],
        options: {
          model: ''
        }
      },
      {
        field: 'action',
        header: 'Delete',
        sort: false,
        colsEnable: true,
        options: {
          useDeleteIcon: true
        }
      }
    ];
    this.getAll()
  }

  getAll() {
    this.trapDestinationsService.getAll().subscribe(res => {
      this.trapDes = res;
      this.trapDes.map((item: any) => {
        if (item.status) {
          item.status = "Enable";
          item.statusPreHtml = '<span class="status-icon"><i class="fa fa-fw fa-check-circle-o"></i></span>';
        } else {
          item.status = "Disable";
          item.statusPreHtml = '<span class="status-icon"><i class="fa fa-fw fa-times-circle-o"></i></span>';
        }
      });
    })
  }

  showDeleteDialog = (event: any, data: Trapdestinations) => {
    this.dataInputDelete = data;
    this.isShowDialogDelete = true;
  }

  setIsShowConrfirm(event: boolean){
    this.isShowDialogDelete = event;
    if(event){
      this.isShowDialogDelete = false;
      this.messageService.add({severity: 'info', summary: 'Infor', detail: 'Snmp Destination test has been deleted from VNFM.'});
      this.getAll();
    }
  }
  addTrapDestination = () => {
    this.router.navigate(['/add']);
  }

  onLinkClick = (dataInputDelete: any) => {
    this.router.navigate(['/edit/',dataInputDelete.id]);
  }

  clearAll(){
    this.messageService.clear();
  }

}
