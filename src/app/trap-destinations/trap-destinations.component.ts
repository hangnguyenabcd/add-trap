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
  trapDes: Trapdestinations[] = [];
  cols: any[]=[];
  constructor(private trapDestinationsService: TrapdestinationsService,
    private router: Router) { }

  ngOnInit() {
    this.trapDestinationsService.getCarsSmall().then(res => this.trapDes = res);

    this.cols = [
      { field: 'destinationName', header: 'Destination Name' },
      { field: 'iPAddress', header: 'IP Address' },
      { field: 'portNumber', header: 'Port Number' },
      { field: 'sNMPTrapVersion', header: 'SNMP Trap Version' },
      { field: 'status', header: 'Status' },

    ];
  }
  // handleAdd(){
  //   this.router.navigateByUrl('/add');
  // }

//   customSort(event: SortEvent) {
//     event.data.sort((data1, data2) => {
//         let value1 = data1[event.field];
//         let value2 = data2[event.field];
//         let result = null;

//         if (value1 == null && value2 != null)
//             result = -1;
//         else if (value1 != null && value2 == null)
//             result = 1;
//         else if (value1 == null && value2 == null)
//             result = 0;
//         else if (typeof value1 === 'string' && typeof value2 === 'string')
//             result = value1.localeCompare(value2);
//         else
//             result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

//         return (event.order * result);
//     });
// }

}
