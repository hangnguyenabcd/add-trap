import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.items = [
      {
          label: 'Dashboard'
      },
      {
          label: 'VNF Catalog',
      },
      {
          label: 'VNF Lifecycle',
      },
      {
          label: 'VNFM Configuration',
          items: [
              {label: 'Clouds',},
              {label: 'Tenants',}
          ]
      },
      {
        label: 'Admin',
        items: [
            {label: 'Users'},
            {label: 'Roles'},
            {label: 'Security Realms'},
            {label: 'Settings'},
            {label: 'Database'},
            {label: 'VNFMs'},
            {label: 'Trap Destinations', routerLink: '/home'},
            {label: 'Continuity Plans'},
            {label: 'REST APIs'}
        ]
    },
  ];
  }

}
