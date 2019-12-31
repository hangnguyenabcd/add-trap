import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FilterTypes, FieldName, ItemDropdown } from 'rbn-common-lib';
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
  colus: any[] = [];
  cols: any[] = [
    { field: 'destinationName', header: '', sort: true, colsEnable: true, type: FilterTypes.InputText, data: [],
      options: { model: '', usingLink: true }
    },
    { field: 'ipAddress', header: '', sort: true, colsEnable: true, type: FilterTypes.Dropdown, data: [], options: { model: '' } },
    { field: 'portNumber', header: '', sort: true, colsEnable: true, type: FilterTypes.Dropdown, data: [], options: { model: '' } },
    { field: 'version', header: '', sort: true, colsEnable: true, type: FilterTypes.Dropdown, data: [], options: { model: '' } },
    { field: 'status', header: '', sort: true, colsEnable: true, type: FilterTypes.Dropdown, data: [], options: { model: '' } },
    { field: 'action', header: '', sort: false, colsEnable: true, options: { useDeleteIcon: true } }
  ];
  isShowDialogDelete = false;
  dataInputDelete?: any;
  fieldName = FieldName;
  translateResults: any = {};
  transalteTrapDestination: any;

  constructor(
    private trapDestinationsService: TrapdestinationsService,
    private messageService: MessageService,
    private router: Router,
    private translate: TranslateService) {
      this.translate.get('ADMIN').subscribe((result: any) => {
        this.cols[4].header = result.STATUS;
        this.cols[5].header = result.DELETE;
      });
      this.translate.get('COMMON').subscribe((result: any) => {
        this.translateResults = result;
      });
      this.translate.get('ADMIN.TRAP_DESTINATIONS').subscribe((result: any) => {
        this.cols[0].header = result.NAME;
        this.cols[1].header = result.IP_ADDRESS;
        this.cols[2].header = result.PORT_NUMBER;
        this.cols[3].header = result.SNMP_TRAP_VERSION;
        this.transalteTrapDestination = result;
      });
  }

  ngOnInit() {
    // this.colus = [
    //   { field: 'destinationName', header: 'Destination Name' },
    //   { field: 'ipAddress', header: 'IP Address' },
    //   { field: 'portNumber', header: 'Port Number' },
    //   { field: 'version', header: 'SNMP Trap Version' },
    //   { field: 'status', header: 'Status' },
    this.getAll()
  }

  getAll() {
    this.trapDestinationsService.getAll().subscribe(res => {
      this.trapDes = res.body;

      this.initDropdownData(this.cols);
      this.trapDes.map((item: any) => {
        this.cols.map(col => {
          if (col.type === FilterTypes.Dropdown) {
            this.dataDropdown(col.data, item, col.field);
          }
          if (item.status) {
            item.status = this.transalteTrapDestination.ENABLED;;
            item.statusPreHtml = '<span class="status-icon"><i class="fa fa-fw fa-check-circle-o"></i></span>';
          } else {
            item.status = this.transalteTrapDestination.DISABLED;
            item.statusPreHtml = '<span class="status-icon"><i class="fa fa-fw fa-times-circle-o"></i></span>';
          }
        });
      });
    });
  }

  showDeleteDialog = (event: any, data: any) => {
    this.dataInputDelete = data;
    this.isShowDialogDelete = true;
  }

  setIsShowConrfirm(event: boolean) {
    this.isShowDialogDelete = event;
    if (event) {
      this.isShowDialogDelete = false;
      this.messageService.add({ severity: 'info', summary: 'Infor', detail: 'Snmp Destination test has been deleted from VNFM.' });
      this.getAll();
    }
  }
  addTrapDestination = () => {
    this.router.navigate(['/add']);
  }

  onLinkClick = (dataInputDelete: any) => {
    this.router.navigate(['/edit/', dataInputDelete.id]);
  }

  clearAll() {
    this.messageService.clear();
  }

  refreshData = () => {
    this.getAll();
  }

  initDropdownData = (cols: Array<any>) => {
    return cols.map((item: any) => {
      if (item.type !== FilterTypes.Multiselect) {
        item.data = [new ItemDropdown()];
        item.data[0].label = 'All';
      } else {
        item.data = [];
      }
    });
  }

  dataDropdown(arr: ItemDropdown[], item: any, title: any) {
    if (arr && arr.findIndex(i => i.value === item[title]) === -1) {
      if (item[title]) {
        arr.push(new ItemDropdown(item[title], item[title]));
      }
    }
  }
}
